<?php

/**
 * @file
 * Default theme implementation to display the basic html structure of a single
 * Drupal page.
 *
 * Variables:
 * - $css: An array of CSS files for the current page.
 * - $language: (object) The language the site is being displayed in.
 *   $language->language contains its textual representation.
 *   $language->dir contains the language direction. It will either be 'ltr' or 'rtl'.
 * - $rdf_namespaces: All the RDF namespace prefixes used in the HTML document.
 * - $grddl_profile: A GRDDL profile allowing agents to extract the RDF data.
 * - $head_title: A modified version of the page title, for use in the TITLE
 *   tag.
 * - $head_title_array: (array) An associative array containing the string parts
 *   that were used to generate the $head_title variable, already prepared to be
 *   output as TITLE tag. The key/value pairs may contain one or more of the
 *   following, depending on conditions:
 *   - title: The title of the current page, if any.
 *   - name: The name of the site.
 *   - slogan: The slogan of the site, if any, and if there is no title.
 * - $head: Markup for the HEAD section (including meta tags, keyword tags, and
 *   so on).
 * - $styles: Style tags necessary to import all CSS files for the page.
 * - $scripts: Script tags necessary to load the JavaScript files and settings
 *   for the page.
 * - $page_top: Initial markup from any modules that have altered the
 *   page. This variable should always be output first, before all other dynamic
 *   content.
 * - $page: The rendered page content.
 * - $page_bottom: Final closing markup from any modules that have altered the
 *   page. This variable should always be output last, after all other dynamic
 *   content.
 * - $classes String of classes that can be used to style contextually through
 *   CSS.
 *
 * @see template_preprocess()
 * @see template_preprocess_html()
 * @see template_process()
 *
 * @ingroup themeable
 */

?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML+RDFa 1.0//EN"
  "http://www.w3.org/MarkUp/DTD/xhtml-rdfa-1.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language; ?>" version="XHTML+RDFa 1.0" dir="<?php print $language->dir; ?>"<?php print $rdf_namespaces; ?>>

<head profile="<?php print $grddl_profile; ?>">
  <?php
//  print $head; 
  ?>
  <title><?php print $head_title; ?></title>
  <?php 
  print $styles; 
  ?>
  <?php print $scripts; ?>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
<!--<script  src="/misc/jquery.js?v=1.4.4" type="text/javascript"></script>-->
<!--<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>-->
<style type="text/css">
    @font-face {
    font-family: 'Alef';
    src: url('/sites/default/files/fonts/Alef-Regular.eot');
    src: url('/sites/default/files/fonts/Alef-Regular.eot?#iefix') format('embedded-opentype'),
         url('/sites/default/files/fonts/Alef-Regular.woff') format('woff'),
         url('/sites/default/files/fonts/Alef-Regular.ttf') format('truetype'),
         url('/sites/default/files/fonts/Alef-Regular.svg#alefregular') format('svg');
    font-weight: normal;
    font-style: normal;
}
*{
    outline: none;
    font-family: Alef;
}
body{
    margin-top: 0px !important;
}
a.facebook-action-connect {
  display: block !important;
  margin: 206px auto 0;
  transform: scale(1.6);
  width: 89px;
}
</style>

<style media="all" type="text/css">
    @import url("/sites/all/themes/sub_bartik/css/jukespot.css");
    
</style>
<script src="/sites/all/modules/mimi/jukespot.js" type="text/javascript"></script>
<link rel="text/css" type="text/css" media="all" src="/sites/all/themes/sub_bartik/jukespot.css"/>
</head>
<body class="multi">
<?php  print $page; ?>
</body>
</html>
