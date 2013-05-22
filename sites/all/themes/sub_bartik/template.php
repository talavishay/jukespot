<?php
function sub_bartik_preprocess_html (&$vars) {
    if ( $_GET['q'] == "node/62") {
        $vars['theme_hook_suggestions'][] = "html-node-62";
  }
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
