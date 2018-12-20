<?php
/**
 * Created by PhpStorm.
 * User: charl
 * Date: 12/23/2016
 * Time: 7:02 PM
 */

namespace Cirsim;

/**
 * Grading of Cirsim assignment
 *
 * Does not actually create a grading element. Manual or other grading categories
 * should be used for actual grade entry. This provides a way to bring up a student
 * assignment in Cirsim with custom tests.
 */
class GradeCirsim extends \Assignments\Grade {

	/** Constructor
	 * @param $grading The Assignment Grading object this is a member of
	 * \param $name A category name for display */
	public function __construct(\Assignments\Grading $grading, $name) {
		parent::__construct($grading, 0, '');
		$this->name = $name;

		$this->cirsim = new CirsimViewAux();
	}

	public function __set($name, $value) {
		switch($name) {
			case 'configurator':
				$this->configurator = $value;
				break;

			default:
				parent::_set($name, $value);
				break;
		}
	}

	/** Item display name */
	public function get_name() {return $this->name;}

	/** Create the part of the form for a manual grade entry */
	public function grading_form(\User $user) {
		$html = <<<HTML
<h2>$this->name</h2>

HTML;

		if($this->configurator !== null) {
			$this->configurator->configure($this->get_assignment(), $this->cirsim, $user);
		}

		$this->cirsim->set_other_user($user);
		$html .= $this->cirsim->present_div_minimal() .
			$this->cirsim->present_script($user->get_course(), \User::get());


		return $html;
	}

	/** Display the grade to a user */
	public function graded_form() {
		return '';
	}

	/** Handle POST from the part of a form for manual grade entry */
	public function post_form(\User $user) {
		return;
	}

	/** Optional auxiliary view associated with a grade */
	public function get_view_aux() {return $this->cirsim;}

	/** The computed or entered grade for this category.
	 *
	 * This category is informational and does not contribute
	 * to the grade, so we return a value of zero. */
	public function get_grade() {return 0;}

	public function get_cirsim() {
		return $this->cirsim;
	}


	private $name;				///< Name of the grading element
	private $cirsim;			///< CirsimViewAux object
	private $configurator = null;	///< Installed Cirsim configure object
}
