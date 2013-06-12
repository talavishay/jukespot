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
    @font-face {
    font-family: 'avgardm';
    src: url('/sites/default/files/fonts/AVGARDM.eot');
    src: url('/sites/default/files/fonts/AVGARDM.eot?#iefix') format('embedded-opentype'),
         url('/sites/default/files/fonts/AVGARDM.woff') format('woff'),
         url('/sites/default/files/fonts/AVGARDM.ttf') format('truetype'),
         url('/sites/default/files/fonts/AVGARDM.svg#alefregular') format('svg');
    font-weight: normal;
    font-style: normal;
}
*{
    outline: none;
    font-family: Alef;
}

body,
html body.admin-menu,
body.admin-menu{
    margin-top: 0px !important;
    background-color: black;
    color: white;
    background-image: url("/bg_pepole.jpg");
}

.graphLabel {
     border-top: 5px solid black;
    position: relative;
    color: black;
    top: -120px;
    width: 100%;
    padding-bottom: 50px;
    font-size:30px;
}
.content{
        margin-left: 50px;
        position: fixed !important;
        bottom: -100px;
}
.graphValue:after{
    content: "%";
}

.graphValue,
.graphValue:after {
    font-size: 40px;
    font-weight: bold;
}
/*.graphValue1{
    color:#33cccc
}
.graphValue2{
    color: #ffff00;
}
.graphValue3{
    color: #FF6699;
}
.graphValue4{
    color: #00ff00;
}*/
#counter {
    font-size: 493px;
    font-weight: 900;
    letter-spacing: -45px;
    position: absolute;
    text-align: center;
    top: -680px;
    width: 100%;
    color: rgb(51, 204, 204); 
    font-family: avgardm;
}

#counter span {
    display: block;
    font-size: 123px;
    letter-spacing: normal;
    line-height: 110px;
    position: relative;
    top:250px;
}
#logo{
       background: url("/jukespot-logo.png") no-repeat scroll center center transparent;
    border-bottom: 1px solid;
    border-top: 1px solid white;
    display: block;
    height: auto !important;
    margin: 10px 5%;
    top: 0;
    width: 90% !important;
}
/*dream effect -- START*/
.drawingpix	{ 

	position:absolute; 

	top:-50px; 

	left:-50px;

}



a{

text-decoration:none;

/*color:#0075FF;*/

z-index:1;

}

a div{

display:none;

position: absolute;

margin-top:105px;

margin-left:133px;

}

a:hover div{

display:block;

}

.tip {

 padding:10px;

position:absolute;

top:0%;

left:0%;

width:300px;

height:300px;

margin-left:0px;

margin-top:0px;

text-align:center;



  opacity:0.8;

  filter:alpha(opacity=80);

}



.tip .body {

  color: #0075FF;

  background-color: #B5FF00;

  padding:5px 5px 5px 5px;

   border-radius:5px; 

  -moz-border-radius:5px;

  -webkit-border-radius:5px;

}
/*dream effect -- END */
/*  circle    */
.circle{
    border-radius:	100% !important;
    -moz-border-radius:  100% !important;
    -webkit-border-radius: 500px  !important;
    /*background: none repeat scroll 0 0 #ffffff;*/
    border-radius: 100% 100% 100% 100% !important;
    border-style: solid;
    border-width: 5px;
    float: right;
    height: 88%;
    margin: 1%;
    width: 88%;
    text-align: center;
    vertical-align: middle !important;   
    /*font-size: 300%;*/
    cursor: pointer;
    padding:5%;    
      display: none;
}
body.page .circle-container{
    width: 100% !important;height: 100% !important;
}
.circle-container{
    padding: 0px;margin: 0px;position: absolute;z-index: 10;
}
#container {
 display: block;
margin-bottom: 15px;
margin-left: auto;
margin-right: auto;
position: relative;
top: 70px;
}
span.word {
    font-weight: 900;
}
@-webkit-keyframes pulseScale{
0%{        opacity: 1;         }
25%{        opacity: .5;    }
50%{        opacity: .1;    }
75%{        opacity: .8;    }
100%{      opacity: 1;         }
}
@-moz-keyframes pulseScale{
0%{        opacity: 1;         }
25%{        opacity: .5;    }
50%{        opacity: .1;    }
75%{        opacity: .8;    }
100%{      opacity: 1;         }
}
.pulse{
animation-delay:0;
 animation-duration: 0.5s;
    animation-iteration-count: 17;
    animation-name: pulseScale;
 -webkit-animation-duration: 0.5s;
    -webkit-animation-iteration-count: 5;
    -webkit-animation-name: pulseScale;
}

/*  circle  -- ENd  */
#countdown {
    color: rgb(51, 204, 204); 
    position: fixed;
    top: 100px;
    text-align: center;
    width: 90%;
    font-size: 200px;
       font-weight: 900;
}
.kkc-godz-text,
.kkc-godz{
    display:none;
}
#time_left_text{
    font-size: 60px ;
       font-weight: 900;
}
.kkcount-down * {
  font-family: avgardm !important;
}
</style>


<link rel="text/css" type="text/css" media="all" src="/sites/all/themes/sub_bartik/jukespot.css"/>
<!--<script type="text/javascript" src="/sites/all/modules/mimi/mimi.js" type="text/javascript"></script>-->
    <script type="text/javascript" src="/sites/all/modules/mimi/results.js" type="text/javascript"></script>
    <script type="text/javascript" src="/sites/all/modules/mimi/jqBarGraph.1.1.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="/sites/all/modules/mimi/kkcountdown.js" type="text/javascript"></script>
</head>
<body class="multi">
    <div id="logo"></div>
    <div id="container" class="">
    
    <div class="circle-container " id="a">                <div class="circle ">
            <a href="#" class="circle_link " id="circle_1"><span></span></a>
    </div>            </div>
</div>
<?php  print $page; ?>
</body>
</html>