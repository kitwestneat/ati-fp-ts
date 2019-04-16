<?php
/**
 * Plugin Name: PBH Front Page Admin
 */
defined('ABSPATH') or die('No script kiddies please!');

define('PBH_FP_MODULE_LIST_KEY', 'pbh_fp_module_list_key');

add_action('admin_menu', function () {
    $page = add_menu_page('PBH Front Page Admin', 'PBH Front Page Admin', 'manage_options', 'pbh-fp-admin', 'pbh_fp_admin_page');
    add_action("load-$page", function () {
        add_action('admin_enqueue_scripts', function () {
            require 'enqueue.php';
        });
    });
});

function pbh_fp_get_module_list() {
    return get_option(PBH_FP_MODULE_LIST_KEY, array());
}

function pbh_fp_save_module_list($module_list) {
    add_option(PBH_FP_MODULE_LIST_KEY, $module_list);
}

function pbh_fp_admin_page() {
    if ($_POST['module_list']) {
        pbh_fp_save_module_list($_POST['module_list']);
        wp_die("OK", 200);
    }

    $module_list = pbh_fp_get_module_list();
    ?>
  <script>!function(l){function e(e){for(var r,t,n=e[0],o=e[1],u=e[2],f=0,i=[];f<n.length;f++)t=n[f],p[t]&&i.push(p[t][0]),p[t]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(l[r]=o[r]);for(s&&s(e);i.length;)i.shift()();return c.push.apply(c,u||[]),a()}function a(){for(var e,r=0;r<c.length;r++){for(var t=c[r],n=!0,o=1;o<t.length;o++){var u=t[o];0!==p[u]&&(n=!1)}n&&(c.splice(r--,1),e=f(f.s=t[0]))}return e}var t={},p={1:0},c=[];function f(e){if(t[e])return t[e].exports;var r=t[e]={i:e,l:!1,exports:{}};return l[e].call(r.exports,r,r.exports,f),r.l=!0,r.exports}f.m=l,f.c=t,f.d=function(e,r,t){f.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},f.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},f.t=function(r,e){if(1&e&&(r=f(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var t=Object.create(null);if(f.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var n in r)f.d(t,n,function(e){return r[e]}.bind(null,n));return t},f.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return f.d(r,"a",r),r},f.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},f.p="wordpress/wp-content/themes/ati-2018/frontpage/";var r=window.webpackJsonp=window.webpackJsonp||[],n=r.push.bind(r);r.push=e,r=r.slice();for(var o=0;o<r.length;o++)e(r[o]);var s=n;a()}([])</script>
  <script>
  window.module_list = <?php echo $module_list; ?>;

  startAdmin(window.module_list);
  </script>

  <div id="root"></div>
<?php
}
