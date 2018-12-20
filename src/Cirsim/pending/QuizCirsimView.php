<?php
/**
 * @file
 * View class implementing a view of a QuizCirsim
 */

namespace Cirsim;

/** View class implementing a view of a QuizCirsim
 */
class QuizCirsimView extends \Quiz\QuizView {
	/**
	 * Constructor
	 * @param \Course $course
	 * @param \User $user
	 * @param Quiz $quiz The actual loaded quiz
	 * @param $session $_SESSION
	 */
	public function __construct(\Course $course, \User $user, \Quiz\Quiz $quiz, &$session) {
		parent::__construct($course, $user, $quiz, $session);
	}

	/**
	 * Called after the quiz box and before the quiz previews.
	 *
	 * Override in derived class to support custom page content
	 * @return string HTML
	 */
	public function before_preview() {
		return \View::s_exit_body() .
			'<div id="cirsim" class="cirsim-window" style="display: none"></div>' .
			\View::s_reenter_body();
	}
}