<?php
namespace HomeModules {
    $TAG_COLORS = array(
        "#4200ff",
        "#673fb4",
        "#4036ff",
        "#0098f9",
        "#2abd68",
        "#ffbb2c",
        "#ff3000",
        "#f1453d",
        "#f72666",
        "#0255f9",
    );
    shuffle($TAG_COLORS);

    function get_category_color($tag_name, $tag_id = false) {
        global $TAG_COLORS;
        static $cat_count = 0;
        static $color_map = array();

        if (!isset($color_map[$tag_name])) {
            $color = $tag_id ? get_term_meta($tag_id, 'tag_color', true) : false;

            if (!$color || strtolower($color) == '#ffffff') {
               $color = $TAG_COLORS[$cat_count++ % count($TAG_COLORS)];
            }

            $color_map[$tag_name] = $color;
        }

        return $color_map[$tag_name];
    }

    function get_post_category($post_id) {
        $tag_name = get_post_meta($post_id, '_pbh_featured_tag', true);
        if ($tag_name) {
            $tag = get_term_by('name', $tag_name, 'post_tag');
            if (!$tag) {
                return array(
                    'categoryName' => $tag_name,
                    'categoryColor' => get_category_color($tag_name),
                );
            }
        } else {
            $tags = get_the_tags($post_id);
            if (!$tags) {
                return array();
            }

            global $pbh_config;
            $blacklisted_tags_str = $pbh_config["blacklisted_badge_tags"];
            if ($blacklisted_tags_str) {
                $blacklisted_tags = array_map(
                    function($tag) { return trim($tag); },
                    explode(',', $blacklisted_tags_str)
                );
                if (count($blacklisted_tags) > 0) {
                    $tags = array_filter($tags, function($tag) use ($blacklisted_tags) { return !in_array($tag->slug, $blacklisted_tags); });
                }
            }

            // we don't want sentiment tags on the frontpage
            $tags = array_filter($tags, function($tag) {
                return strpos($tag->slug, 'sentiment-') === FALSE &&
                       strpos($tag->slug, '-warning') === FALSE &&
                       $tag->slug != 'paginated';
            });

            $tag_idx = array_rand($tags);
            $tag = $tags[$tag_idx];
        }

        if (!$tag) {
            return array();
        }

        return array(
            'categoryName' => $tag->name,
            'categoryColor' => get_category_color($tag->name, $tag->term_id),
        );
    }

    function wp_posts_to_fp_posts($posts) {
        return array_map(function ($post) {
            $featured_img = false;
            $og_cache = get_post_meta($post->ID, '_pbh_og_cache', true);
            if ($og_cache) {
                $featured_img = $og_cache[0];
            }
            if (!$featured_img) {
                $featured_img_id = get_post_thumbnail_id($post);
                $fi_arr = wp_get_attachment_image_src($featured_img_id, 'full');
                if (is_array($fi_arr)) {
                    $featured_img = $fi_arr[0];
                } else {
                    $featured_img = '/thumb-default.jpg';
                }
            }

            $category = get_post_category($post->ID);

            return array_merge(array(
                'id' => $post->ID,
                'title' => get_the_title($post),
                'imageSrc' => $featured_img,
                'link' => get_permalink($post),
                'authorName' => get_the_author_meta('display_name', $post->post_author),
            ), $category);
        }, $posts);
    }

    function hot_post_to_fp_mapper($post) {
            $category = get_post_category($post['id']);

            $title = apply_filters('the_title', html_entity_decode($post['title']), $post['id']);
            if ($post['author_name']) {
                $author_name = $post['author_name'];
            } else if ($post['author']) {
                $author = get_user_by('slug', $post['author']);
                if ($author) {
                    $author_name = $author->get('display_name');
                } else {
                    error_log('hot_post_to_fp_mapper: unknown post author='.$post['author']);
                }
            } else {
                error_log('hot_post_to_fp_mapper: post author not set, post_id=', $post['id']);
                $author_name= '';
            }

            return array_merge(array(
                'id' => $post['id'],
                'title' => $title,
                'imageSrc' => $post['thumb'],
                'link' => get_permalink($post['id']),
                'authorName' => $author_name,
            ), $category);
    }

    function hot_posts_to_fp_posts($posts) {
        return array_map(function ($post) {
            return hot_post_to_fp_mapper(array(
                'id' => $post->wordPressPost->id,
                'title' => $post->wordPressPost->title,
                'thumb' => $post->wordPressPost->thumbs[0],
                'author_name' => $post->wordPressPost->authorName,
            ));
        }, $posts);
    }

    function hot_posts_to_fp_posts_legacy($posts) {
        return array_map('HomeModules\hot_post_to_fp_mapper', $posts);
    }

    function get_hot_post_ids($posts) {
        return array_map(function ($post) {return $post['id'];}, $posts);
    }

    function get_post_ids($posts) {
        return array_map(function ($post) {return $post->ID;}, $posts);
    }

    function get_instagram_posts() {
        $instagram_json_file = '/vhosts/all-that-is-interesting/ati-instagram.json';

        if (!file_exists($instagram_json_file)) {
            $instagram_json_file = get_template_directory() . '/ati-instagram.json';
        }

        if (defined('INSTAGRAM_TEST')) {
            $instagram_json_file = get_template_directory() . '/file-not-found.json';
        }

        return json_decode(file_get_contents($instagram_json_file));
    }

    function get_hu_instagram_posts() {
        $instagram_json_file = '/vhosts/all-that-is-interesting/hu-instagram.json';

        if (!file_exists($instagram_json_file)) {
            $instagram_json_file = get_template_directory() . '/hu-instagram.json';
        }

        return json_decode(file_get_contents($instagram_json_file));
    }

    function get_hot_posts($query) {
        global $pbh_metrics_plugin;
        if (!$pbh_metrics_plugin) {
            error_log('using legacy GA hot post metrics');
            return get_hot_posts_legacy($query);
        }

        $q = array_merge(array(
            'timeframe' => '-30 days',
            'posts_per_page' => 5,
            'order_by' => 'hotness',
        ), $query);

        if ($q['term_type']) {
            $posts = $pbh_metrics_plugin->get_hot_posts_by_term($q['term'], $q['term_type']);
        } else {
            $posts = $pbh_metrics_plugin->get_hot_posts(
                $q['timeframe'],
                $q['posts_per_page'],
                $q['order_by']
            );
        }
        $fp_posts = hot_posts_to_fp_posts($posts);

        update_ids_to_skip(get_hot_post_ids($fp_posts));

        return $fp_posts;
    }

    function get_hot_posts_legacy($query) {
        $q = array_merge(array(
            'timeframe' => '-30 days',
            'posts_per_page' => 5,
            'order_by' => 'ga_post_shares',
        ), $query);

        if ($q['term_type']) {
            $posts = pbh_ga_get_hot_posts_by_term($q['term'], $q['term_type']);
        } else {
            $posts = pbh_ga_get_hot_posts(
                $q['timeframe'],
                $q['posts_per_page'],
                $q['order_by']
            );
        }

        update_ids_to_skip(get_hot_post_ids($posts));

        return hot_posts_to_fp_posts_legacy($posts);
    }

    function get_wp_posts($query) {
        $default_params = array(
            'posts_per_page' => 5,
            'suppress_filters' => false, // needed for title_like search
            'post__not_in' => ids_to_skip()
        );
        $posts = get_posts(array_merge(
            $default_params,
            $query
        ));

        update_ids_to_skip(get_post_ids($posts));

        return wp_posts_to_fp_posts($posts);
    }

    function ids_to_skip($update = false) {
        static $ids_to_skip = array();
        if ($update) {
            $ids_to_skip = $update;
        }

        return $ids_to_skip;
    }

    function update_ids_to_skip($new_ids) {
        $new_ids_to_skip = array_merge($new_ids, ids_to_skip());

        return ids_to_skip($new_ids_to_skip);
    }

    function get_module_posts($query) {
        if ($query == 'instagram') {
            return get_instagram_posts();
        }
        if ($query == 'hu-instagram') {
            return get_hu_instagram_posts();
        }

        if (!is_array($query)) {
            error_log("get_module_posts: expected query to be array");

            return array();
        }

        if (($query['query_type'] ?? false) == 'hot_posts') {
            $posts = get_hot_posts($query);
        } else {
            $posts = get_wp_posts($query);
        }


        return $posts;
    }
}

/** EXPORTS **/
namespace {
    function make_module($opts) {
        $module_type = $opts['module_opts']['type'];
        $query = $opts['query'] ?? false;

        if ($module_type == 'instagram') {
            $query = ($opts['module_opts']['isHU'] ?? false) ? 'hu-instagram' : 'instagram';
        } else if (!$query) {
            return $opts['module_opts'];
        } else if ($module_type == 'recentAndTrending') {
          global $paged;

          $recent_query = array_merge(array('paged' => $paged), $query, $opts['query_recent'] ?: array());
          $trending_query = array_merge(array('query_type' => 'hot_posts'), $query, $opts['query_trending'] ?: array());

          $module = array_merge(array(
            'recentPosts' => HomeModules\get_module_posts($recent_query),
            'trendingPosts' => HomeModules\get_module_posts($trending_query),
            'tag' => $query['tag'],
          ), $opts['module_opts']);

          return $module;
        }

        $module = array_merge(array(
            'posts' => HomeModules\get_module_posts($query),
        ), $opts['module_opts']);

        return $module;
    }

    function get_tag_module($tag_slug, $module_opts, $query = array()) {
        return get_term_module($tag_slug, 'post_tag', $module_opts, $query);
    }

    function get_cat_module($cat_slug, $module_opts, $query = array()) {
        return get_term_module($cat_slug, 'category', $module_opts, $query);
    }

    function get_term_module($slug, $taxonomy, $module_opts, $query = array()) {
        echo "<!-- get_term_module $slug $taxonomy -->";
        if ($taxonomy == 'category') {
            $term_path = 'category';
            $term_key = 'category_name';
        } else if ($taxonomy == 'post_tag') {
            $term_path = 'tag';
            $term_key = 'tag';
        }
        $term = get_term_by('slug', $slug, $taxonomy);
        $module_opts = array_merge(array(
                'sectionLink' => "/$term_path/$slug",
                'sectionColor' => HomeModules\get_category_color($slug, $term->term_id),
            ), $module_opts);

        $name = ucwords($term->name);

        return array(
                'module_opts' => array_merge(array('tag' => $name), $module_opts),
                'query' => array_merge(array($term_key => $slug), $query),
            );
    }
}
?>
