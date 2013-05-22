<?php
function sub_bartik_preprocess_html (&$vars) {
    if ( $_GET['q'] == "node/62") {
        
//        	drupal_add_css(drupal_get_path('theme', 'sub_bartik') . '/css/jukespot.css');	
  }
}

/**
 * Return a link to initiate a Facebook Connect login or association.
 *
 * @param $link
 *   An array of properties to be used to generate a login link. Note that all
 *   provided properties are required for the Facebook login to succeed and
 *   must not be changed. If $link is FALSE, Facebook OAuth is not yet
 *   configured.
 * @see fboauth_link_properties()
 */
function sub_bartik_fboauth_action__connect($variables) {
  $action = $variables['action'];
  $link = $variables['properties'];
  $url = url($link['href'], array('query' => $link['query']));
  $link['attributes']['class'] = isset($link['attributes']['class']) ? $link['attributes']['class'] : 'facebook-action-connect';
  $link['attributes']['rel'] = 'nofollow';
  $attributes = isset($link['attributes']) ? drupal_attributes($link['attributes']) : '';
  $title = isset($link['title']) ? check_plain($link['title']) : '';
  $src = ($GLOBALS['is_https'] ? 'https' : 'http') . '://www.facebook.com/images/fbconnect/login-buttons/connect_light_medium_short.gif';
  return '<a ' . $attributes . ' href="' . $url . '"><img src="' . $src . '" alt="' . $title . '" /></a>';
}

/*
function sub_bartik_field__taxonomy_term_reference($variables) {
  $output = '';

  // Render the label, if it's not hidden.
  if (!$variables['label_hidden']) {
    $output .= '<h3 class="field-label">' . $variables['label'] . ': </h3>';
  }

  // Render the items.
  $output .= ($variables['element']['#label_display'] == 'inline') ? '<ul class="links inline">' : '<ul class="links">';
     $parentTax = taxonomy_get_parents($variables["element"]["#object"]->field_article_caritaristic["und"][0]["tid"]);
	foreach ($parentTax as $key => $val){
		
	$output .= '<li  >' . $parentTax[$key]->name . '</li>';
		
	}

  foreach ($variables['items'] as $delta => $item) {
    $output .= '<li class="taxonomy-term-reference-' . $delta . '"' . $variables['item_attributes'][$delta] . '>' . drupal_render($item) . '</li>';
  }
  $output .= '</ul>';

  // Render the top-level DIV.
  $output = '<div class="' . $variables['classes'] . (!in_array('clearfix', $variables['classes_array']) ? ' clearfix' : '') . '"' . $variables['attributes'] . '>' . $output . '</div>';

  return $output;
}
*/
?>
