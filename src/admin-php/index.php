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
  <script>!function(e){function t(t){for(var n,p,a=t[0],f=t[1],i=t[2],c=0,s=[];c<a.length;c++)p=a[c],Object.prototype.hasOwnProperty.call(o,p)&&o[p]&&s.push(o[p][0]),o[p]=0;for(n in f)Object.prototype.hasOwnProperty.call(f,n)&&(e[n]=f[n]);for(l&&l(t);s.length;)s.shift()();return u.push.apply(u,i||[]),r()}function r(){for(var e,t=0;t<u.length;t++){for(var r=u[t],n=!0,a=1;a<r.length;a++){var f=r[a];0!==o[f]&&(n=!1)}n&&(u.splice(t--,1),e=p(p.s=r[0]))}return e}var n={},o={1:0},u=[];function p(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,p),r.l=!0,r.exports}p.m=e,p.c=n,p.d=function(e,t,r){p.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},p.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},p.t=function(e,t){if(1&t&&(e=p(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(p.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)p.d(r,n,function(t){return e[t]}.bind(null,n));return r},p.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return p.d(t,"a",t),t},p.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},p.p="/wordpress/wp-content/themes/ati-2018/frontpage/";var a=this["webpackJsonpati-fp-ts"]=this["webpackJsonpati-fp-ts"]||[],f=a.push.bind(a);a.push=t,a=a.slice();for(var i=0;i<a.length;i++)t(a[i]);var l=f;r()}([]);</script>

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
