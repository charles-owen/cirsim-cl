<?php
/**
 * @file
 *
 * This is the base class for classes written to configure
 * CirsimViewAux. This allows for a configuration to be
 * deferred to grading time.
 */

namespace CL\Cirsim;

use CL\Users\User;
use CL\Course\Assignment;

/**
 * This is the base class for classes written configure
 * CirsimViewAux. This allows for a configuration to be
 * deferred to grading time.
 *
 * @cond
 * @property boolean grading
 * @property User user
 * @endcond
 */
class CirsimConfigurator {
	/**
	 * Configure Cirsim for an assignment.
	 * @param Assignment $assignment Assignment we are configuring for
	 * @param CirsimViewAux $cirsim The Cirsim view object
	 * @param User $user User we are viewing
	 * @param bool $grading True if this is the grading page presentation.
	 */
	public function configure(Assignment $assignment,
							  CirsimViewAux $cirsim, User $user, $grading=false) {
		$this->grading = $grading;
		$this->user = $user;
	}

	/**
	 * Property get magic method
	 *
	 * <b>Properties</b>
	 * Property | Type | Description
	 * -------- | ---- | -----------
	 *
	 * @param string $property Property name
	 * @return mixed
	 */
	public function __get($property) {
		switch($property) {
			case 'grading':
				return $this->grading;

			case 'user':
				return $this->user;

			default:
				$trace = debug_backtrace();
				trigger_error(
					'Undefined property ' . $property .
					' in ' . $trace[0]['file'] .
					' on line ' . $trace[0]['line'],
					E_USER_NOTICE);
				return null;
		}
	}

	/**
	 * Property set magic method
	 *
	 * <b>Properties</b>
	 * Property | Type | Description
	 * -------- | ---- | -----------
	 *
	 * @param string $property Property name
	 * @param mixed $value Value to set
	 */
	public function __set($property, $value) {
		switch($property) {

			default:
				$trace = debug_backtrace();
				trigger_error(
					'Undefined property ' . $property .
					' in ' . $trace[0]['file'] .
					' on line ' . $trace[0]['line'],
					E_USER_NOTICE);
				break;
		}
	}

	/**
	 * Get any additional information to present on the
	 * assignment grading page.
	 * @return string HTML
	 */
	public function gradingInfo() {
		return '';
	}


	private $grading;
	private $user;
}