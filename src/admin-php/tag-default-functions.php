<?php
require 'module-functions.php'

function get_tag_title($tag, $taxonomy = 'post_tag') {
    // array is used if it's a multi tag page
    if (is_array($tag)) {
      list($tags_mode, $tags) = $tag;
      $tag_titles = array_map(get_tag_title, $tags);

      return implode(' & ', $tag_titles);
    }

    // currently only used by multi tags
    if (is_string($tag)) {
      $tag = get_term_by('slug', $tag, $taxonomy);
    } else if (class_exists('WPSEO_Taxonomy_Meta')) {
        $title = WPSEO_Taxonomy_Meta::get_term_meta( $tag, $tag->taxonomy, 'title' );
    }

    if (!is_string($title) || $title === '') {
        $title = ucwords($tag->name);
    }

    return $title;
}

function get_default_tag_image($tag) {
  $slug = false;
  if (!is_array($tag)) {
    $slug = $tag->slug;
  }

  switch ($slug) {
  case 'history':
    $tag_image = get_template_directory_uri()
        .'/assets/images/interesting-history-articles.jpg';
    $tag_image_alt = 'Interesting History Articles';
    break;
  case 'science':
    $tag_image = get_template_directory_uri()
        .'/assets/images/interesting-science-articles.jpg';
    $tag_image_alt = 'Interesting Science Articles';
    break;
  case 'news':
    $tag_image = get_template_directory_uri()
        .'/assets/images/default_tag_image.jpg';
    $tag_image_alt = 'Interesting News Stories';
    break;
  case 'holocaust':
    $tag_image = get_template_directory_uri()
        .'/assets/images/holocaust-stories.jpg';
    $tag_image_alt = 'Holocaust Stories';
    break;
  case 'serial-killers':
    $tag_image = get_template_directory_uri()
        .'/assets/images/serial-killers.jpg';
    $tag_image_alt = 'Serial Killers';
    break;
  case 'science-news':
    $tag_image = get_template_directory_uri()
        .'/assets/images/science-news.jpg';
    $tag_image_alt = 'Latest Science News';
    break;
  case 'world-war-2':
    $tag_image = get_template_directory_uri()
        .'/assets/images/world-war-2-history.jpg';
    $tag_image_alt = 'World War 2 History';
    break;
  case 'mafia':
    $tag_image = get_template_directory_uri()
        .'/assets/images/american-mafia-history.jpg';
    $tag_image_alt = 'American Mafia History';
    break;
  case 'archaeology':
    $tag_image = get_template_directory_uri()
        .'/assets/images/archaeology-news.jpg';
    $tag_image_alt = 'Archaeology News';
    break;
  case 'nazis':
    $tag_image = get_template_directory_uri()
        .'/assets/images/who-were-the-nazis.jpg';
    $tag_image_alt = 'Who Were The Nazis';
    break;
  case 'weird-news':
    $tag_image = get_template_directory_uri()
        .'/assets/images/weird-news-stories.jpg';
    $tag_image_alt = 'Weird News Stories';
    break;
  default:
    $tag_image = get_template_directory_uri()
        .'/assets/images/default_tag_image.jpg';
    $tag_image_alt = get_tag_title($tag);
    break;
  }

  return array($tag_image, $tag_image_alt);
}

function get_default_tag_modules($tag, $paginate = false) {
  $tag_taxonomy = 'post_tag';
  if (is_array($tag)) {
    list($tags_mode, $tags) = $tag;
    if ($tags_mode == 'tag_slug__and') {
      $tag_slug = implode('+', $tags);
    } else {
      $tag_slug = implode(',', $tags);
    }

    $tag_description = "";
    $paginate = true;
  } else {
    $tag_slug = $tag->slug;
    $tag_description = tag_description();
    $tag_taxonomy = $tag->taxonomy;
  }
  $tag_title = get_tag_title($tag);
  list($tag_image, $tag_image_alt) = get_default_tag_image($tag);

  $term_type = $tag_taxonomy === 'post_tag' ? 'tag' : 'category';

  $module_defs = array(
    array(
      'module_opts' => array(
          'type' => 'tag',
          'imageSrc' => $tag_image,
          'imageAlt' => $tag_title,
          'description' => $tag_description,
          'name' => $tag_title,
          'paginate' => $paginate,
      ),
    ),
    array_merge(get_term_module($tag_slug, $tag_taxonomy, array(
        'type' => 'recentAndTrending'
      )), array(
        'query_recent' => array('posts_per_page' => 9),
        'query_trending' => array('term_type' => $term_type, 'term' => $tag_slug),
      )
    ),
  );

  return $module_defs;
}

// HISTORY ////////////
function get_default_history_tag_modules($tag) {
  $tag_slug = $tag->slug;
  list($tag_image, $tag_image_alt) = get_default_tag_image($tag);

  $module_defs = array(
    array(
      'module_opts' => array(
          'type' => 'tag',
          'imageSrc' => $tag_image,
          'imageAlt' => $tag_image_alt,
          'description' => tag_description(),
          'name' => get_tag_title($tag)
      ),
    ),
    array_merge(get_tag_module($tag_slug, array(
          'type' => 'recentAndTrending'
        )), array(
          'query_recent' => array('posts_per_page' => 9),
          'query_trending' => array('term_type' => 'tag', 'term' => $tag_slug),
        )
    ),
    array('module_opts' => array('type' => 'history-newsletter')),
    get_tag_module('world-war-2', array(
        'type' => 'splitTagBox',
        'sectionTitle' => 'Stories From World War 2',
        'split' => 'left',
        'hasFeaturedPost' => true,
        'showAuthorName' => 'always',
      ),array('posts_per_page' => 4),
    ),
    get_tag_module('history+serial-killers', array(
      'sectionLink' => '/tag/serial-killers',
      'type' => 'trending',
      'mediumMobilePosts' => true,
      'showIcon' => false,
      'sectionTitle' => "History's Most Heinous Serial Killers",
    ), array('posts_per_page' => 3)),
    array('module_opts' => array('type'=>'instagram', 'isHU' => true), 'query' => 'hu-instagram'),
    get_tag_module('women+ancient-history', array(
        'type' => "tagOverlapTitle",
        'sectionTitle' => "Heroines From Ancient History",
      )
    ),
  );

  return $module_defs;
}

// SCIENCE ////////////
function get_default_science_tag_modules($tag) {
  $tag_slug = $tag->slug;
  list($tag_image, $tag_image_alt) = get_default_tag_image($tag);

  $module_defs = array(
    array(
      'module_opts' => array(
          'type' => 'tag',
          'imageSrc' => $tag_image,
          'imageAlt' => $tag_image_alt,
          'description' => tag_description(),
          'name' => get_tag_title($tag)
      ),
    ),
    array_merge(get_tag_module($tag_slug, array(
          'type' => 'recentAndTrending'
        )), array(
          'query_recent' => array('posts_per_page' => 9),
          'query_trending' => array('term_type' => 'tag', 'term' => $tag_slug),
        )
    ),
    array('module_opts' => array('type' => 'ati-newsletter')),
    get_cat_module('science-news', array(
        'type' => 'splitTagBox',
        'sectionTitle' => 'Breaking Science News',
        'split' => 'left'
      )
    ),
    get_tag_module('science+history+people', array(
      'sectionLink' => '',
      'type' => 'trending',
      'mediumMobilePosts' => true,
      'showIcon' => false,
      'sectionTitle' => "Scientific Luminaries Of Years Past",
    ), array('posts_per_page' => 3)),
  );

  return $module_defs;
}

// NEWS ////////////
function get_default_news_tag_modules($tag) {
  $tag_slug = $tag->slug;
  list($tag_image, $tag_image_alt) = get_default_tag_image($tag);

  $module_defs = array(
    array(
      'module_opts' => array(
          'type' => 'tag',
          'imageSrc' => $tag_image,
          'imageAlt' => $tag_image_alt,
          'description' => tag_description(),
          'name' => get_tag_title($tag)
      ),
    ),
    array_merge(get_tag_module($tag_slug, array(
          'type' => 'recentAndTrending'
        )), array(
          'query_recent' => array('posts_per_page' => 9),
          'query_trending' => array('term_type' => 'tag', 'term' => $tag_slug),
        )
    ),
    get_cat_module('weird-news', array(
        'type' => 'splitTagBox',
        'sectionTitle' => "Today's Weirdest News Stories",
        'split' => 'left'
      )
    ),
    get_cat_module('science-news', array(
      'type' => 'trending',
      'mediumMobilePosts' => true,
      'showIcon' => false,
      'sectionTitle' => 'Breaking Science News',
    ), array('posts_per_page' => 3)),
    get_tag_module('crime', array(
        'type' => "tagOverlapTitle",
        'sectionTitle' => "The Most Ridiculous Crime Stories",
      )
    ),
  );

  return $module_defs;
}

// HOLOCAUST ////////////
function get_default_holocaust_tag_modules($tag) {
  $tag_slug = $tag->slug;
  list($tag_image, $tag_image_alt) = get_default_tag_image($tag);

  $module_defs = array(
    array(
      'module_opts' => array(
          'type' => 'tag',
          'imageSrc' => $tag_image,
          'imageAlt' => $tag_image_alt,
          'description' => tag_description(),
          'name' => get_tag_title($tag)
      ),
    ),
    array_merge(get_tag_module($tag_slug, array(
          'type' => 'recentAndTrending'
        )), array(
          'query_recent' => array('posts_per_page' => 9),
          'query_trending' => array('term_type' => 'tag', 'term' => $tag_slug),
        )
    ),
    get_tag_module('nazis', array(
        'type' => 'splitTagBox',
        'sectionTitle' => 'The History Of The Nazis',
        'split' => 'left'
      )
    ),
    get_tag_module('holocaust+sentiment-uplifting', array(
      'type' => 'trending',
      'mediumMobilePosts' => true,
      'showIcon' => false,
      'sectionTitle' => "Stories Of Hope From The Holocaust",
    ), array('posts_per_page' => 3)),
  );

  return $module_defs;
}

// SERIAL KILLERS ////////////
function get_default_serial_killers_tag_modules($tag) {
  $tag_slug = $tag->slug;

  $module_defs = array(
    array(
      'module_opts' => array(
          'type' => 'tag',
          'imageSrc' => $tag_image,
          'imageAlt' => $tag_image_alt,
          'description' => tag_description(),
          'name' => get_tag_title($tag)
      ),
    ),
    array_merge(get_tag_module($tag_slug, array(
          'type' => 'recentAndTrending',
          'tag' => 'Serial Killers',
        )), array(
          'query_recent' => array('posts_per_page' => 9),
          'query_trending' => array('term_type' => 'tag', 'term' => $tag_slug),
        )
    ),
    get_tag_module('serial-killers+women', array(
        'sectionLink' => '/female-serial-killers',
        'type' => 'splitTagBox',
        'sectionTitle' => "Unhinged Female Serial Killers",
        'split' => 'left'
      )
    ),
    get_tag_module('serial-killers,crime', array(
      'sectionLink' => '',
      'type' => 'trending',
      'mediumMobilePosts' => true,
      'showIcon' => false,
      'sectionTitle' => 'Gruesome Cases Of Cannibalism',
    ), array('posts_per_page' => 3, 's' => 'cannibal')),
  );

  return $module_defs;
}

// SCIENCE NEWS ////////////
function get_default_science_news_tag_modules($tag) {
  $tag_slug = $tag->slug;
  list($tag_image, $tag_image_alt) = get_default_tag_image($tag);

  $module_defs = array(
    array(
      'module_opts' => array(
          'type' => 'tag',
          'imageSrc' => $tag_image,
          'imageAlt' => $tag_image_alt,
          'description' => tag_description(),
          'name' => get_tag_title($tag)
      ),
    ),
    array_merge(get_cat_module($tag_slug, array(
          'type' => 'recentAndTrending',
          'tag' => 'Science News',
        )), array(
          'query_recent' => array('posts_per_page' => 9),
          'query_trending' => array('term_type' => 'category', 'term' => $tag_slug),
        )
    ),
    get_tag_module('space+news', array(
        'sectionLink' => '/tag/space',
        'type' => 'splitTagBox',
        'sectionTitle' => "The Latest Developments From Space",
        'split' => 'left'
      )
    ),
    get_tag_module('archaeology+news', array(
      'sectionLink' => '/tag/archaeology',
      'type' => 'trending',
      'mediumMobilePosts' => true,
      'showIcon' => false,
      'sectionTitle' => 'Archaeological Discoveries',
    ), array('posts_per_page' => 3)),
  );

  return $module_defs;
}

// WWII ////////////
function get_default_wwii_tag_modules($tag) {
  $tag_slug = $tag->slug;
  list($tag_image, $tag_image_alt) = get_default_tag_image($tag);

  $module_defs = array(
    array(
      'module_opts' => array(
          'type' => 'tag',
          'imageSrc' => $tag_image,
          'imageAlt' => $tag_image_alt,
          'description' => tag_description(),
          'name' => get_tag_title($tag)
      ),
    ),
    array_merge(get_tag_module($tag_slug, array(
          'type' => 'recentAndTrending'
        )), array(
          'query_recent' => array('posts_per_page' => 9),
          'query_trending' => array('term_type' => 'tag', 'term' => $tag_slug),
        )
    ),
    get_tag_module('holocaust', array(
        'type' => 'splitTagBox',
        'sectionTitle' => 'Stories From The Holocaust',
        'split' => 'left'
      )
    ),
    get_tag_module('soviet-union+world-war-2', array(
      'sectionLink' => '',
      'type' => 'trending',
      'mediumMobilePosts' => true,
      'showIcon' => false,
      'sectionTitle' => "The Brutality Of The Eastern Front",
    ), array('posts_per_page' => 3)),
    get_tag_module('japan+world-war-2', array(
        'sectionLink' => '',
        'type' => "tagOverlapTitle",
        'sectionTitle' => "The Gruesome War With Japan",
      )
    ),
    get_tag_module('nazis', array(
        'type' => 'splitTagBox',
        'sectionTitle' => 'The Rise And Fall Of The Nazis',
        'split' => 'right'
      )
    ),
  );

  return $module_defs;
}

// MAFIA ////////////
function get_default_mafia_tag_modules($tag) {
  $tag_slug = $tag->slug;
  list($tag_image, $tag_image_alt) = get_default_tag_image($tag);

  $module_defs = array(
    array(
      'module_opts' => array(
          'type' => 'tag',
          'imageSrc' => $tag_image,
          'imageAlt' => $tag_image_alt,
          'description' => tag_description(),
          'name' => get_tag_title($tag)
      ),
    ),
    array_merge(get_tag_module($tag_slug, array(
          'type' => 'recentAndTrending'
        )), array(
          'query_recent' => array('posts_per_page' => 9),
          'query_trending' => array('term_type' => 'tag', 'term' => $tag_slug),
        )
    ),
    get_tag_module('people+mafia', array(
        'type' => 'splitTagBox',
        'sectionTitle' => 'Larger-Than-Life Mobsters',
        'split' => 'left'
      )
    ),
    get_tag_module('movies+mafia', array(
      'sectionLink' => '',
      'type' => 'trending',
      'mediumMobilePosts' => true,
      'showIcon' => false,
      'sectionTitle' => "The Mafia In The Movies",
    ), array('posts_per_page' => 3)),
    get_tag_module('mafia+new-york-city', array(
        'sectionLink' => '',
        'type' => "tagOverlapTitle",
        'sectionTitle' => "The Five Families Of New York",
      )
    ),
  );

  return $module_defs;
}

// ARCHAEOLOGY ////////////
function get_default_archaeology_tag_modules($tag) {
  $tag_slug = $tag->slug;
  list($tag_image, $tag_image_alt) = get_default_tag_image($tag);

  $module_defs = array(
    array(
      'module_opts' => array(
          'type' => 'tag',
          'imageSrc' => $tag_image,
          'imageAlt' => $tag_image_alt,
          'description' => tag_description(),
          'name' => get_tag_title($tag)
      ),
    ),
    array_merge(get_tag_module($tag_slug, array(
          'type' => 'recentAndTrending'
        )), array(
          'query_recent' => array('posts_per_page' => 9),
          'query_trending' => array('term_type' => 'tag', 'term' => $tag_slug),
        )
    ),
    get_tag_module('archaeology+ancient-history', array(
        'type' => 'splitTagBox',
        'sectionTitle' => 'Discoveries From The Ancient World',
        'split' => 'left'
      )
    ),
  );

  return $module_defs;
}

// NAZIS ////////////
function get_default_nazis_tag_modules($tag) {
  $tag_slug = $tag->slug;
  list($tag_image, $tag_image_alt) = get_default_tag_image($tag);

  $module_defs = array(
    array(
      'module_opts' => array(
          'type' => 'tag',
          'imageSrc' => $tag_image,
          'imageAlt' => $tag_image_alt,
          'description' => tag_description(),
          'name' => get_tag_title($tag)
      ),
    ),
    array_merge(get_tag_module($tag_slug, array(
          'type' => 'recentAndTrending'
        )), array(
          'query_recent' => array('posts_per_page' => 9),
          'query_trending' => array('term_type' => 'tag', 'term' => $tag_slug),
        )
    ),
    get_tag_module('holocaust', array(
        'type' => 'splitTagBox',
        'sectionTitle' => "The Nazi's Final Solution",
        'split' => 'left'
      )
    ),
    get_tag_module('nazis', array(
      'sectionLink' => '',
      'type' => 'trending',
      'mediumMobilePosts' => true,
      'showIcon' => false,
      'sectionTitle' => "The Third Reich Under Hitler",
    ), array('posts_per_page' => 3, 'title_like' => 'adolf hitler')),
  );

  return $module_defs;
}

// WEIRD NEWS ////////////
function get_default_weird_news_tag_modules($tag) {
  $tag_slug = $tag->slug;
  list($tag_image, $tag_image_alt) = get_default_tag_image($tag);

  $module_defs = array(
    array(
      'module_opts' => array(
          'type' => 'tag',
          'imageSrc' => $tag_image,
          'imageAlt' => $tag_image_alt,
          'description' => tag_description(),
          'name' => get_tag_title($tag)
      ),
    ),
    array_merge(get_cat_module($tag_slug, array(
          'type' => 'recentAndTrending',
          'tag' => 'Weird News',
        )), array(
          'query_recent' => array('posts_per_page' => 9),
          'query_trending' => array('term_type' => 'category', 'term' => $tag_slug),
        )
    ),
    get_tag_module('sentiment-weird+crime', array(
        'sectionLink' => '',
        'type' => 'splitTagBox',
        'sectionTitle' => "Absurd Crime Stories",
        'split' => 'left'
      )
    ),
    get_tag_module('science+discoveries', array(
      'sectionLink' => '/category/science-news',
      'type' => 'trending',
      'mediumMobilePosts' => true,
      'showIcon' => false,
      'sectionTitle' => 'Fantastic Scientific Discoveries',
    ), array('posts_per_page' => 3)),
    get_tag_module('news', array(
        'sectionLink' => '/florida-man-news-2018',
        'type' => "tagOverlapTitle",
        'sectionTitle' => "The Adventures Of Florida Man",
      ), array('title_like' => 'florida man')
    ),
  );

  return $module_defs;
}

