<?php
/**
 * @file
 * Class that implements a grade for a Cirsim task.
 */

namespace CL\Cirsim;

use CL\Grades\GradePart;
use CL\Site\Site;
use CL\Users\User;


/**
 * Grading of Cirsim assignment
 *
 * Does not actually create a grading element. Manual or other grading categories
 * should be used for actual grade entry. This provides a way to bring up a student
 * assignment in Cirsim with custom tests.
 */
class GradeCirsim extends GradePart {

	/**
	 * Constructor
	 * \param $name A category name for display
	 */
	public function __construct($name) {
		parent::__construct(0, 'grade-cirsim');
		$this->__set("name", $name);

		$this->cirsim = new CirsimViewAux();
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
			case 'cirsim':
				return $this->cirsim;

			default:
				return parent::__get($property);
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
			case 'configurator':
				$this->configurator = $value;
				break;

			default:
				parent::__set($property, $value);
				break;
		}
	}


	/**
	 * Create the grading form for staff use
	 * @param Site $site The Site object
	 * @param User $user User we are grading
	 * @param array $grades Result from call to getUserGrades
	 * @return array describing a grader
	 */
	public function createGrader(Site $site, User $user, array $grades) {
		$data = parent::createGrader($site, $user, $grades);

		$data['status'] = 0;

		$this->cirsim->save = false;
		$assignment = $this->grading->assignment;

		$html = '';

		if($this->configurator !== null) {
			$this->configurator->configure($assignment, $this->cirsim, $user, true);
			$html .= $this->configurator->gradingInfo();

		}

		$html .= $this->cirsim->present_div($site, $user, false,'cl-fat');

		$data['html'] = $html;
		return $data;
	}


	/**
	 * Compute the grade for this assignment
	 * @param int $memberId Member we are grading
	 * @param array $grades Result from call to getUserGrades
	 * @return array with keys 'points' and optionally 'override'
	 */
	public function computeGrade($memberId, array $grades) {
		return ['points'=>0];
	}


	private $cirsim;			    // CirsimViewAux object
	private $configurator = null;	// Installed Cirsim configurator object
}
