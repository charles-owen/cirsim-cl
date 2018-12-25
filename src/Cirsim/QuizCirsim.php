<?php
/**
 * @file
 * A Cirsim-based quiz.
 */

namespace CL\Cirsim;

use \CL\Quiz\Quiz;
use \CL\Quiz\QuizView;
use \CL\Site\Site;

/**
 * A Cirsim-based quiz.
 */
class QuizCirsim extends Quiz {

	/**
	 * Constructor
	 * @param string $assignTag Assignment this quiz is for
	 * @param string $quizTag A tag unique to this quiz in this assignment
	 * @param int $points Number of points assigned to this quiz
	 */
	public function __construct($assignTag, $quizTag, $points) {
		parent::__construct($assignTag, $quizTag, $points);
	}

	/**
	 * Factory function to create a view appropriate for this quiz
	 * @param Site $site the Site object
	 * @return QuizView object
	 */
	public function createView(Site $site) {
		return new QuizCirsimView($site, $this);
	}
}