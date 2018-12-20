<?php
/**
 * Created by PhpStorm.
 * User: charl
 * Date: 12/23/2016
 * Time: 11:23 AM
 */

namespace Cirsim;

/**
 * Representation of a Quiz we use in the playground
 */
class QuizCirsim extends \Quiz\Quiz {
	/** Constructor
	 * @param Assignment $assignment Assignment this quiz is for
	 * @param $tag A tag unique to this quiz in this assignment
	 */
	public function __construct(\Assignments\Assignment $assignment, $tag, $points) {
		parent::__construct($assignment, $tag, $points);
	}

	/**
	 * Factory function to create a view appropriate for this quiz
	 * @param \User $user User we are creating the view for
	 * @param $session $_SESSION array
	 * @return QuizView object
	 */
	public function create_view(\User $user, &$session) {
		$course = $this->get_assignment()->get_course();
		return new QuizCirsimView($course, $user, $this, $session);
	}
}