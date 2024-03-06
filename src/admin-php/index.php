<?php
/**
 * Plugin Name: PBH Front Page Admin
 */
defined('ABSPATH') or die('No script kiddies please!');

define('PBH_FP_MODULE_LIST_KEY', 'pbh_fp_module_list_key');
define('PBH_FP_TAG_MODULE_LIST_KEY', 'pbh_tag_module_list_key');
define('PBH_FP_DEFAULT_MODULE_LIST', '[{"module_opts":{"type":"recent"},"query":[]},{"module_opts":{"sectionLink":"\/tag\/history","sectionColor":"#ff3000","type":"tagTileBox","typeVariant":1,"sectionTitle":"History Uncovered"},"query":{"tag":"history"}},{"module_opts":{"type":"instagram"},"query":"instagram"},{"module_opts":{"sectionLink":"\/tag\/sentiment-weird","sectionColor":"#f72666","type":"tagTileBox","order":2,"sectionTitle":"Our Weird World"},"query":{"tag":"sentiment-weird","tag__not_in":389}},{"module_opts":{"type":"newsletter"}},{"module_opts":{"sectionLink":"\/tag\/news","sectionColor":"#ffbb2c","type":"trending","sectionTitle":"Trending News"},"query":{"tag":"news","posts_per_page":9}},{"module_opts":{"sectionLink":"\/tag\/crime","sectionColor":"#0098f9","type":"tagTileBox","typeVariant":2,"sectionTitle":"Real True Crime"},"query":{"tag":"crime"}},{"module_opts":{"sectionLink":"\/tag\/women+history","sectionColor":"#2abd68","type":"tagTileBox","order":2,"typeVariant":3,"sectionTitle":"Women In History"},"query":{"tag":"women+history"}}]');

require 'tag-default-functions.php';

add_action('admin_menu', function () {
    $page = add_menu_page('PBH Front Page Admin', 'PBH Front Page Admin', 'manage_options', 'pbh-fp-admin', 'pbh_fp_admin_page');
    add_action("load-$page", function () {
        add_action('admin_enqueue_scripts', function () {
            // the default forms css screws up the react native stuff
            wp_deregister_style('forms');
            wp_register_style('forms', '');

            require 'enqueue.php';
        });
    });
});

function pbh_fp_get_module_list() {
    return get_option(PBH_FP_MODULE_LIST_KEY, PBH_FP_DEFAULT_MODULE_LIST);
}

function pbh_fp_save_module_list($module_list) {
    update_option(PBH_FP_MODULE_LIST_KEY, $module_list, false);
}

function pbh_fp_get_tag_module_list($tag) {
    $saved_modules = get_term_meta($tag->term_id, PBH_FP_TAG_MODULE_LIST_KEY, true) ?: false;
    if ($saved_modules) {
        $modules = array_map(function ($mod) use ($tag) {
            if ($mod['module_opts']['type'] != 'tag') {
                return $mod;
            }

            $mod['module_opts']['description'] = $tag->description;
            $mod['module_opts']['name'] = get_tag_title($tag);

            return $mod;
        }, json_decode($saved_modules, true));

        return json_encode($modules);
    }

    switch ($tag->slug) {
    case 'history':
        $module_defs = get_default_history_tag_modules($tag);
        break;
    case 'science':
        $module_defs = get_default_science_tag_modules($tag);
        break;
    case 'news':
        $module_defs = get_default_news_tag_modules($tag);
        break;
    case 'holocaust':
        $module_defs = get_default_holocaust_tag_modules($tag);
        break;
    case 'serial-killers':
        $module_defs = get_default_serial_killers_tag_modules($tag);
        break;
    case 'science-news':
        $module_defs = get_default_science_news_tag_modules($tag);
        break;
    case 'world-war-2':
        $module_defs = get_default_wwii_tag_modules($tag);
        break;
    case 'mafia':
        $module_defs = get_default_mafia_tag_modules($tag);
        break;
    case 'archaeology':
        $module_defs = get_default_archaeology_tag_modules($tag);
        break;
    case 'nazis':
        $module_defs = get_default_nazis_tag_modules($tag);
        break;
    case 'weird-news':
        $module_defs = get_default_weird_news_tag_modules($tag);
        break;
    default:
        $module_defs = get_default_tag_modules($tag);
        break;
    }

    return json_encode($module_defs);
}

function pbh_fp_save_tag_module_list($tag_id, $module_list) {
    update_term_meta($tag_id, PBH_FP_TAG_MODULE_LIST_KEY, $module_list);
}

add_action('post_tag_edit_form_fields', function ($tag, $tax) {
    ?>
    <div class="form-field">
      <a href="/wordpress/wp-admin/admin.php?page=pbh-fp-admin&tag_id=<?php echo $tag->term_id ?>">Edit Tag Page Layout</a>
    </div>
<?php
}, 40, 2);

function pbh_fp_admin_page() {
    if ($_POST['module_list']) {
        $module_list = stripslashes($_POST['module_list']);
        if ($_POST['tag_id']) {
            pbh_fp_save_tag_module_list($_POST['tag_id'], $module_list);
        } else {
            pbh_fp_save_module_list($module_list);
        }
        wp_die("OK", 200);
    }

    $tag_id = $_GET['tag_id'];
    if ($tag_id) {
        $tag = get_tag($tag_id);
        $module_list = pbh_fp_get_tag_module_list($tag);
    } else {
        $module_list = pbh_fp_get_module_list();
    }
    ?>
  <script>!function(l){function e(e){for(var r,t,n=e[0],o=e[1],u=e[2],f=0,i=[];f<n.length;f++)t=n[f],p[t]&&i.push(p[t][0]),p[t]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(l[r]=o[r]);for(s&&s(e);i.length;)i.shift()();return c.push.apply(c,u||[]),a()}function a(){for(var e,r=0;r<c.length;r++){for(var t=c[r],n=!0,o=1;o<t.length;o++){var u=t[o];0!==p[u]&&(n=!1)}n&&(c.splice(r--,1),e=f(f.s=t[0]))}return e}var t={},p={1:0},c=[];function f(e){if(t[e])return t[e].exports;var r=t[e]={i:e,l:!1,exports:{}};return l[e].call(r.exports,r,r.exports,f),r.l=!0,r.exports}f.m=l,f.c=t,f.d=function(e,r,t){f.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},f.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},f.t=function(r,e){if(1&e&&(r=f(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var t=Object.create(null);if(f.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var n in r)f.d(t,n,function(e){return r[e]}.bind(null,n));return t},f.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return f.d(r,"a",r),r},f.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},f.p="wordpress/wp-content/themes/ati-2018/frontpage/";var r=window.webpackJsonp=window.webpackJsonp||[],n=r.push.bind(r);r.push=e,r=r.slice();for(var o=0;o<r.length;o++)e(r[o]);var s=n;a()}([])</script>

  <script>
    window.module_list = <?php echo PBH_FP_DEFAULT_MODULE_LIST ?>;
    window.tag = <?php echo $tag ? json_encode($tag) : 'undefined' ?>;
  </script>
  <script>
  try {
    window.module_list = <?php echo $module_list; ?>;
  } catch(e) {
    console.error("error loading module list", e);
  }
  </script>
  <script>
  jQuery(function() {
      startAdmin(window.module_list, window.tag);
  });
  </script>

  <div id="root"></div>
<?php
}
