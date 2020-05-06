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
		$this->tests = [];
		$this->appTag = null;
		$this->name = null;
		$this->tabs = [];
		$this->imports = [];
		$this->save = false;
		$this->options = [];
		$this->user = null;
		$this->components = null;
		$this->load = null;
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
				return $this->tests;

			case 'appTag':
				return $this->appTag;

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

            case 'appTag':
                $this->appTag = $value;
                break;

            case 'components':
                $this->components = $value;
                break;

            case 'save':
                $this->save = $value;
                break;

            case "tab":
				$this->tabs[] = $value;
				break;

			case "tabs":
				$this->tabs = $value;
				break;

			case 'tests':
				$this->tests = $value;
				break;


			case 'load':
				$this->load = $value;
				break;


			default:
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
		$this->appTag = $appTag;
		$this->name = $name;
		$this->save = $save;
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
		$this->imports[] = ["into"=>$intoTab,
			"name"=>$name,
			"from"=>$fromTab,
			'extra'=>[
				"appTag"=>$appTag,
			]];
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

		$data = [
			'display'=>$full ? 'full' : 'window'
		];

		foreach($this->options as $option => $value) {
			$data[$option] = $value;
		}

		// User dependent features
		if($user !== null) {

			if($user->staff) {
                // Features only available to staff by default
                if($this->answer !== null) {
				    $data['loadMenu'] = [['name'=>'Load Solution', 'json'=>$this->answer]];
                }
			} else {
			    // Not available to users other than staff
                $data['export'] = 'none';
			}

		}

		if($site->installed('filesystem')) {
			// Filesystem dependent features
			$data['api'] = [
				'extra'=>[
					'type'=>'application/json'
				]
			];

			if($this->user !== null) {
				$data['api']['extra']['memberId'] = $this->user->member->id;
			}

			if($this->name !== null) {
				//
				// Single-save mode
				//

				if($this->save) {
					$data['api']['save'] = [
						'url'=> $root . '/cl/api/filesystem/save',
						'name'=>$this->name
					];


					// Adding this will load the file on open via Ajax
					// instead of the normal behavior of loading it now
					// and putting it into the 'load' option. Only keeping
					// it around as a way of testing the OpenDialog functionality.
	//				$data['api']['open'] = [
	//					'url'=> $root . '/cl/api/filesystem/load',
	//					'name'=>$this->name
	//				];
				}

				if($user !== null) {
					// Loading the single-save file
					$fileSystem = new FileSystem($site->db);
					$file = $fileSystem->readText($user->id, $user->member->id, $this->appTag, $this->name);
					if($file !== null) {
						$data['load'] = $file['data'];
					}
				}

			} else {
				if($this->save) {
					$data['api']['save'] = [
						'url'=> $root . '/cl/api/filesystem/save'
					];

					$data['api']['files'] = [
						'url'=> $root . '/cl/api/filesystem'
					];

					$data['api']['open'] = [
						'url'=> $root . '/cl/api/filesystem/load'
					];
				}
			}

			if($this->appTag !== null) {
				$data['api']['extra']['appTag'] = $this->appTag;
			}

			if(count($this->imports) > 0) {
				$data['imports'] = $this->imports;

				$data['api']['import'] = [
					'url'=> $root . '/cl/api/filesystem/load'
				];
			}
		}

		if(count($this->tabs) > 0) {
			$data['tabs'] = $this->tabs;
		}

		$this->optional($data, 'components', $this->components);
		$this->optional($data, 'load', $this->load);


		//
		// Tests
		//
		$tests = [];
		foreach($this->tests as $test) {
			if($test['staff'] && !$user->staff) {
				continue;
			}

			$tests[] = base64_encode(json_encode($test));
		}

		if(count($tests) > 0) {
			$data['tests'] = $tests;
		}

		if(strlen($class) > 0) {
			$class = ' ' . $class;
		}

		$payload = htmlspecialchars(json_encode($data), ENT_NOQUOTES);
		$html .= '<div class="cl-cirsim' . $class . '">' . $payload . '</div>';


		return $html;
	}

	private function optional(&$data, $name, $property) {
		if($property !== null) {
			$data[$name] = $property;
		}
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
		$class = $class !== null ? ' ' . $class : '';
		$data = [
			'display'=>'inline',
			'load'=>$json
		];

		foreach($this->options as $option => $value) {
			$data[$option] = $value;
		}

		$payload = htmlspecialchars(json_encode($data), ENT_NOQUOTES);
		$html = '<div class="cl-cirsim' . $class . '">' . $payload . '</div>';

		return $html;
	}


	/**
	 * Add other Cirsim config options.
	 * @param string $option Option name
	 * @param mixed $value Value to set
	 */
	public function option($option, $value) {
		$this->options[$option] = $value;
	}



	/**
	 * Indicate that only certain components should be allowed.
	 * Expects a list of only allowed components...
	 * @deprecated Use components property instead
	 */
	public function set_only() {
		$this->components = func_get_args();
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
		if(is_callable($test)) {
			$test_func = $test;
			$test = array();

			$size = count($input);
			for($i=0; $i<pow(2, $size); $i++) {
				$row = array();
				for($c=0; $c<$size; $c++) {
					$a = ($i >> ($size-$c-1)) & 1;
					$row[] = $a;
				}

				$result = call_user_func_array($test_func, $row);
				if(is_array($result)) {
					foreach($result as $r) {
						$row[] = $r ? 1 : 0;
					}
				} else {
					$row[] = $result ? 1 : 0;
				}

				$test[] = $row;
			}
		}

		$this->tests[] = ['name' => $name,
			'input' => $input,
			'output' => $output,
			'test' => $test,
			'staff' => $staff];
	}

//	public function present_tests() {
//		$html = \Toggle::begin("Expand for testing truth table", "p");
//
//		foreach($this->tests as $test) {
//			$html .= "<h3>" . $test["name"] . "</h3>";
//
//			$html .= '<table class="truth-table"><tr>';
//			foreach($test["input"] as $input) {
//				$html .= "<th>$input</th>";
//			}
//
//			$first = true;
//			foreach($test["output"] as $output) {
//				if($first) {
//					$html .= "<th class=\"border\">$output</th>";
//					$first = false;
//				} else {
//					$html .= "<th>$output</th>";
//				}
//
//			}
//			$html .= "</tr>";
//
//			foreach($test["test"] as $row) {
//				$html .= "<tr>";
//				$i = 0;
//				foreach($row as $cell) {
//					if($i == count($test["input"])) {
//						$html .= "<td class=\"border\">$cell</td>";
//					} else {
//						$html .= "<td>$cell</td>";
//					}
//
//					$i++;
//				}
//				$html .= "</tr>";
//			}
//
//			$html .= '</table>';
//		}
//
//		$html .= \Toggle::end();
//		return $html;
//	}


	private $appTag = null;
	private $name = null;
	private $tests = [];
	private $tabs = [];	        // Any additional tabs to add
	private $imports = [];	    // Any tab imports possible
	private $save;              // True if save support is added
	private $options;           // Other options to set
	private $user;              // User to view/save/etc.
	private $components;        // Components to use
	private $load;              // JSON to load
    private $answer = null;     // Any answer JSON
}