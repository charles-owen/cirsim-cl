<?php
/**
 * @file
 * View class for a basic Cirsim page.
 */

namespace CL\Cirsim;

/**
 * View class for a basic Cirsim page.
 */
class CirsimView extends \View {

	/**
	 * CirsimView constructor.
	 * @param \Course $course Course object we are viewing
	 * @param \User $user Current user
	 */
	public function __construct(\Course $course, \User $user) {
		parent::__construct($course, $user);

		$this->aux = new CirsimViewAux();
		$this->add_aux($this->aux);
	}

	/**
	 * This is overriding the head so we can defer adding the JavaScript
	 * object instantiation until after construction.
	 * @return string HTML
	 */
	public function head() {
		return parent::head();
	}

	public function header() {
		return '';
	}

	public function tail() {
		return '';
	}

	/**
	 * Present the cirsim window in a view.
	 * @param bool $full True for full screen (cirsim-full),
	 * false for windowed (cirsim-window).
	 * @return string
	 */
	public function present($full = false, $class=null) {
		return $this->aux->present($full, $class);
	}

	/**
	 * Calling this function puts Cirsim into single file mode.
	 * Only one file can be saved in this mode.
	 * @param $assignment
	 * @param $tag
	 * @param $name
	 */
	public function single($assignment, $tag, $name) {
		$this->aux->single($assignment, $tag, $name);
	}

	public function get_aux() {
		return $this->aux;
	}

	private $aux;
}