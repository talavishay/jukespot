<?php

/**
 * @file
 * Builds placeholder replacement tokens for values specific to Poll nodes.
 */

/**
 * Implements hook_token_info().
 */
function mimi_poll_token_info() {
  $node['mimi_poll_votes'] = array(
    'name' => t("Poll votes"),
    'description' => t("The number of votes that have been cast on a mimi_poll."),
  );
  $node['mimi_poll-winner'] = array(
    'name' => t("Poll winner"),
    'description' => t("The winning mimi_poll answer."),
  );
  $node['mimi_poll-winner-votes'] = array(
    'name' => t("Poll winner votes"),
    'description' => t("The number of votes received by the winning mimi_poll answer."),
  );
  $node['mimi_poll-winner-percent'] = array(
    'name' => t("Poll winner percent"),
    'description' => t("The percentage of votes received by the winning mimi_poll answer."),
  );
  $node['mimi_poll-duration'] = array(
    'name' => t("Poll duration"),
    'description' => t("The length of time the mimi_poll is set to run."),
  );

  return array(
    'tokens' => array('node' => $node),
  );
}

/**
 * Implements hook_tokens().
 */
function mimi_poll_tokens($type, $tokens, array $data = array(), array $options = array()) {
  $sanitize = !empty($options['sanitize']);
  if (isset($options['language'])) {
    $url_options['language'] = $options['language'];
    $language_code = $options['language']->language;
  }
  else {
    $language_code = NULL;
  }

  $replacements = array();

  if ($type == 'node' && !empty($data['node']) && $data['node']->type == 'mimi_poll') {
    $node = $data['node'];

    $total_votes = 0;
    $highest_votes = 0;
    foreach ($node->choice as $choice) {
      if ($choice['chvotes'] > $highest_votes) {
        $winner = $choice;
        $highest_votes = $choice['chvotes'];
      }
      $total_votes = $total_votes + $choice['chvotes'];
    }
    foreach ($tokens as $name => $original) {
      switch ($name) {
        case 'mimi_poll_votes':
          $replacements[$original] = $total_votes;
          break;

        case 'mimi_poll-winner':
          if (isset($winner)) {
            $replacements[$original] = $sanitize ? filter_xss($winner['chtext']) : $winner['chtext'];
          }
          else {
            $replacements[$original] = '';
          }
          break;

        case 'mimi_poll-winner-votes':
          if (isset($winner)) {
            $replacements[$original] = $winner['chvotes'];
          }
          else {
            $replacements[$original] = '';
          }
          break;

        case 'mimi_poll-winner-percent':
          if (isset($winner)) {
            $percent = ($winner['chvotes'] / $total_votes) * 100;
            $replacements[$original] = number_format($percent, 0);
          }
          else {
            $replacements[$original] = '';
          }
          break;

        case 'mimi_poll-duration':
          $replacements[$original] = format_interval($node->runtime, 1, $language_code);
          break;
      }
    }
  }

  return $replacements;
}
