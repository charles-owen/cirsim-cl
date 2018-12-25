<?php
/**
 * @file
 * View class implementing a view of a QuizCirsim
 */

namespace CL\Cirsim;

use \CL\Quiz\QuizView;

/**
 * View class implementing a view of a QuizCirsim
 */
class QuizCirsimView extends QuizView {
	/**
	 * Present content that goes after the quiz. This is overridden in custom
	 * views when extra content such as Cirsim belongs at the bottom of the page.
	 * @return string HTML
	 */
	public function presentAfter() {
		return <<<HTML
<p class="cl-single-space">&nbsp;</p></div></div><div id="cl-quiz-after"></div><div class="body"><div class="content"><p class="cl-single-space">&nbsp;</p>
HTML;
	}
}