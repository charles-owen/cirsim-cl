<?php
/**
 * @file
 * Auxiliary view to support Cirsim
 */

namespace CL\Cirsim;

use CL\Site\Site;
use CL\Site\ViewAux;
use CL\Site\View;
use CL\Users\User;
use CL\Course\Member;
use CL\FileSystem\FileSystem;

/**
 * View aux class for Cirsim
 *
 * Adds Cirsim to an existing view.
 *
 * @cond
 * @property string answer JSON for a question answer/solution
 * @property string appTag
 * @property mixed components Array of components to use
 * @property boolean save If true, the save menu option is included
 * @property string tab
 * @property array tabs
 * @endcond
 */
class CirsimViewAux extends ViewAux {
	/**
	 * CirsimViewAux constructor.
	 * Sets the default values.
	 */
	public function __construct() {
	    $this->cirsim = new \CL\CirsimPHP\Cirsim();
		$this->reset();
	}

	/**
	 * Called when this auxiliary view is installed in a view
	 * @param View $view View we are installing into
	 */
	public function install(View $view) {
		parent::install($view);

		$view->addJS('cirsim');
	}

	/**
	 * Reset the Cirsim object to no single, tests, or only options.
	 */
	public function reset() {
	    $this->cirsim->reset();
        $this->answer = null;
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
			case 'tests':
				return $this->cirsim->tests;

			case 'appTag':
				return $this->cirsim->appTag;

            case 'name':
                return $this->cirsim->name;

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
     * answer | string | JSON answer to the problem/available to staff
	 * appTag | string | If set, value is used as appTag for the file system
     * components | array | Array of components to include
     * save | boolean | If true, the save menu option is included (default=false)
	 * tab | string | Adds a single tab to the circuit
	 * tabs | array | Adds an array of tabs to the circuit
	 * tests | array | Array of Cirsim tests
	 *
	 * @param string $property Property name
	 * @param mixed $value Value to set
	 */
	public function __set($property, $value) {
		switch($property) {
            case 'answer':
                $this->answer = $value;
                break;

            case 'user':
                $this->user = $value;
                break;

			default:
                if($this->cirsim->set($property, $value)) {
                    break;
                }

				parent::__set($property, $value);
				break;
		}
	}


	/**
	 * Calling this function puts Cirsim into single file mode.
	 * Only one file can be saved in this mode.
	 *
	 * The application tag is an assignment tag if the submission is
	 * limited to submission only during the assignment.
	 *
	 * @param string $appTag The application tag. Can be an assignment tag
	 * @param string $name The name to use
	 * @param boolean $save If true, the save option is included.
	 */
	public function single($appTag, $name, $save = true) {
	    $this->cirsim->single($appTag, $name, $save, false);
	}

	/**
	 * Add a menu option to import a tab from another file. This is
	 * used to import tabs from one quiz to another.
	 *
	 * @param string $intoTab The tab we are importing into
	 * @param string $appTag The assignment for the source file
	 * @param string $name The name of the source file
	 * @param string $fromTab The tab in the source file we are importing from.
	 */
	public function tab_import($intoTab, $appTag, $name, $fromTab) {
	    $this->cirsim->tab_import($intoTab, $appTag, $name, $fromTab);
	}

	/**
	 * Present the cirsim window in a view.
	 * @param bool $full True for full screen (cirsim-full),
	 * false for windowed (cirsim-window).
	 * @param string $class Additional classes to add to the tag
	 * @return string
	 */
	public function present($full = false, $class=null) {
		$html = '';

		if(!$full) {
			$html .= '<div class="cl-cirsim-gap-before"></div>'
				. $this->view->exitBody();
		}

		$site = $this->view->site;
		if($site->installed('users')) {
			$user = $site->users->user;
		} else {
			$user = null;
		}

		$html .= $this->present_div($site, $user, $full, $class);

		if(!$full) {
			$html .= $this->view->reenterBody() .
				'<div class="cl-cirsim-gap-after"></div>';
		}

		return $html;
	}

	/**
	 *
	 * @param bool $full
	 * @return string
	 */

	/**
	 * Present the cirsim div in a view.
	 * @param Site $site The site object
	 * @param User $user Current user
	 * @param bool $full True for full screen (cirsim-full),
	 * false for windowed (cirsim-window).
	 * @param string|null $class Optional class to add to the div
	 * @return string HTML
	 */
	public function present_div(Site $site, User $user=null, $full = false, $class=null) {
		$root = $site->root;

		$html = '';

		// User dependent features
		if($user !== null) {
            $this->cirsim->export = $user->staff;

			if($user->staff) {
                // Features only available to staff by default
                if($this->answer !== null) {
                    $this->cirsim->answer = $this->answer;
                }
			}

		}

		if($site->installed('filesystem')) {
			// Filesystem dependent features
            $this->cirsim->api->load = $root . '/cl/api/filesystem/load';

			if($this->user !== null) {
			    $this->cirsim->api->extra('memberId', $this->user->member->id);
			}

			if($this->cirsim->name !== null) {
				//
				// Single-save mode
				//

                if($this->cirsim->save) {
                    $this->cirsim->api->save = $root . '/cl/api/filesystem/save';
				}

				if($user !== null) {
					// Loading the single-save file
					$fileSystem = new FileSystem($site->db);
					$file = $fileSystem->readText($user->id, $user->member->id, $this->appTag, $this->name);
					if($file !== null) {
					    $this->cirsim->load = $file['data'];
					}
				}

			} else {

				if($this->cirsim->save) {
                    $this->cirsim->api->files = $root . '/cl/api/filesystem';
                    $this->cirsim->api->save = $root . '/cl/api/filesystem/save';
				}
			}
		}

        $html .= $this->cirsim->present($full, $class);

		return $html;
	}

	/**
	 * Present Cirsim in demo mode.
	 *
	 * Demo mode is an inline placement with simulation, but no editing
	 * capabilities. It's used to demo circuit components on a page.
	 * @param string $json JSON file to initially load
	 * @param null $class Additional classes to add to the DIV
	 * @return string HTML
	 */
	public function present_demo($json, $class=null) {
	    return $this->cirsim->present_demo($json, $class);
	}


	/**
	 * Add other Cirsim config options.
	 * @param string $option Option name
	 * @param mixed $value Value to set
	 */
	public function option($option, $value) {
	    $this->cirsim->option($option, $value);
	}



	/**
	 * Indicate that only certain components should be allowed.
	 * Expects a list of only allowed components...
	 * @deprecated Use components property instead
	 */
	public function set_only() {
	    $this->cirsim->components = func_get_args();
	}

	/**
	 * Add a test
	 * @param string $name Test name
	 * @param array $input Array of input pin names
	 * @param array $output Array of output pin names
	 * @param array|callable $test Either: Array of tests, each an array of values
	 *  -or- function to compute result
	 * @param boolean $staff True if only staff members see this test
	 */
	public function add_test($name, array $input, $output, $test, $staff=false) {
	    $this->cirsim->add_test($name, $input, $output, $test, $staff);
	}

    private $cirsim;            // Underlying CirsimPHP\Cirsim object
    private $answer = null;     // Any answer JSON
    private $user = null;       // Optional user to get data for
}