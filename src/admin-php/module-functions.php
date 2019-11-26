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

        if (!$color_map[$tag_name]) {
            if ($tag_id) {
                $color = get_term_meta($tag_id, 'tag_color', true);
            }

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
            $tags = array_filter($tags, function($tag) { return strpos($tag->slug, 'sentiment-') === FALSE && $tag->slug != 'paginated'; });

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
            $featured_img_id = get_post_thumbnail_id($post);
            $featured_img = wp_get_attachment_image_src($featured_img_id, 'full')[0];

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

    function hot_posts_to_fp_posts($posts) {
        return array_map(function ($post) {
            $category = get_post_category($post['id']);

            $title = apply_filters('the_title', html_entity_decode($post['title']), $post['id']);
            $author = get_user_by('slug', $post['author']);

            return array_merge(array(
                'id' => $post['id'],
                'title' => $title,
                'imageSrc' => $post['thumb'],
                'link' => $post['permalink'],
                'authorName' => $author->get('display_name'),
            ), $category);
        }, $posts);
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

        return hot_posts_to_fp_posts($posts);
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

        if ($query['query_type'] == 'hot_posts') {
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
        if (!isset($opts['query'])) {
            return $opts['module_opts'];
        }

        if ($opts['module_opts']['type'] == 'recentAndTrending') {
          global $paged;

          $recent_query = array_merge(array('paged' => $paged), $opts['query'], $opts['query_recent'] ?: array());
          $trending_query = array_merge(array('query_type' => 'hot_posts'), $opts['query'], $opts['query_trending'] ?: array());

          $module = array_merge(array(
            'recentPosts' => HomeModules\get_module_posts($recent_query),
            'trendingPosts' => HomeModules\get_module_posts($trending_query),
            'tag' => $opts['query']['tag'],
          ), $opts['module_opts']);

          return $module;
        }

        $module = array_merge(array(
            'posts' => HomeModules\get_module_posts($opts['query']),
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
