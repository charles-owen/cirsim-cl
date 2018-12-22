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

/**
 * View aux class for Cirsim
 *
 * Adds Cirsim to an existing view.
 */
class CirsimViewAux extends ViewAux {
	private static $unique = 0;

	/**
	 * Called when this auxilliary view is installed in a view
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
		$this->only = null;
		$this->tests = array();
		$this->assignment = null;
		$this->tag = null;
		$this->name = null;
		$this->js = "";
		$this->tabs = array();
		$this->imports = array();
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
			case "js":
				$this->js = $value;
				break;

			case "tab":
				$this->tabs[] = $value;
				break;

			case "tabs":
				$this->tabs = $value;
				break;

			default:
				parent::__set($property, $value);
				break;
		}
	}


	/**
	 * Calling this function puts Cirsim into single file mode.
	 * Only one file can be saved in this mode.
	 * @param $assignment
	 * @param $tag
	 * @param $name
	 */
	public function single($assignment, $tag, $name) {
		$this->assignment = $assignment;
		$this->tag = $tag;
		$this->name = $name;
	}

	/**
	 * Add a menu option to import a tab from another file. This is
	 * used to import tabs from one quiz to another.
	 * @param $into_tab The tab we are importing into
	 * @param $assignment The assignment for the source file
	 * @param $tag The tag for the source file
	 * @param $name The name of the source file
	 * @param $from_tab The tab in the source file we are importing from.
	 */
	public function tab_import($into_tab, $assignment, $tag, $name, $from_tab) {
		$this->imports[] = array("into"=>$into_tab,
			"assignment"=>$assignment,
			"tag"=>$tag,
			"name"=>$name,
			"from"=>$from_tab);
	}

	/**
	 * Present the cirsim window in a view.
	 * @param bool $full True for full screen (cirsim-full),
	 * false for windowed (cirsim-window).
	 * @return string
	 */
	public function present($full = false, $class=null) {
		$view = $this->view;
		$user = $view->get_user();
		$course = $view->get_course();

		return $this->present_div($full, $class) .
			$this->present_script($course, $user);
	}

	/**
	 * Present the cirsim div in a view.
	 * @param bool $full True for full screen (cirsim-full),
	 * false for windowed (cirsim-window).
	 * @return string
	 */
	public function present_div($full = false, $class=null) {
		$this->new_id();

		$html = '';

		$class = $class !== null ? ' ' . $class : '';
		if ($full) {
			$html .= '<div id="' . $this->id . '" class="cirsim-full' . $class . '"></div>';
		} else {
			$html .= $this->view->exit_body() .
				'<div id="' . $this->id . '" class="cirsim-window' . $class . '"></div>' .
				$this->view->reenter_body();
		}

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
		$this->new_id();

		$view = $this->view;
		$user = $view->user;
		$site = $view->site;

		$html = '';

		$class = $class !== null ? ' ' . $class : '';
		$data = [
			'display'=>'inline',
			'load'=>$json
		];
		$payload = htmlspecialchars(json_encode($data), ENT_NOQUOTES);
		$html .= '<div class="cl-cirsim' . $class . '">' . $payload . '</div>';
//
//		$html .= $this->present_script($site, $user, true, $json);

		return $html;
	}

	public function present_div_minimal($class=null) {
		$this->new_id();

		$html = '';

		$class = $class !== null ? ' ' . $class : '';
		$html .= '<div id="' . $this->id . '" class="cirsim-window' . $class . '"></div>';

		return $html;
	}

	public function present_script(Site $site, User $user, $demo=false, $json=null) {
		$html = '<script>$(document).ready(function() ';
		$html .= '{';

		$root = $site->root . '/cirsim';

		$id = $user->id;
		$staff = $user->atLeast(Member::GRADER) ? "1" : "0";

		if($this->name !== null) {
			$html .= <<<JS
var cirsim = new Cirsim.Main("$root", "#$this->id", $id, $staff);
cirsim.single("$this->assignment", "$this->tag", "$this->name");

JS;
		} else {
			$html .= <<<JS
var cirsim = new Cirsim.Main("$root", "#$this->id", $id, $staff);

JS;
		}

		/*
		 * Optional list of only certain components allowed
		 */
		if($this->only !== null) {
			$html .= "cirsim.set_only(";
			$first = true;
			foreach($this->only as $only) {
				if($first) {
					$first = false;
				} else {
					$html .= ',';
				}
				$html .= '"' . $only . '"';
			}
			$html .= ");";
		}

		/*
		 * Tests
		 */
		foreach($this->tests as $test) {
			if($test['staff'] && $user->is_staff()) {
				continue;
			}

			$testjson = base64_encode(json_encode($test));
			$html .= 'cirsim.add_test("' . $testjson . '");';
		}

		if($this->other_user !== null) {
			$html .= 'cirsim.set_userid(' . $this->other_user->get_id() . ');';
		}

		if($demo) {
			$html .= 'cirsim.options.demo = true;';
		}

		if($json !== null) {
			$html .= "cirsim.options.load='" . $json . "';";
		}

		if(count($this->tabs) > 0) {
			$tabs = '';
			foreach($this->tabs as $tab) {
				if(strlen($tabs) > 0) {
					$tabs .= ",";
				}

				$tabs .= '"' . $tab . '"';
			}

			$html .= "cirsim.options.tabs=[$tabs];";
		}

		if(count($this->imports) > 0) {
			$json = json_encode($this->imports);
			$html .= "cirsim.options.imports=$json;";
		}

		$html .= $this->js . 'cirsim.run();});</script>';
		return $html;
	}

	/**
	 * Indicate that only certain components should be allowed.
	 * Expects a list of only allowed components...
	 */
	public function set_only() {
		$this->only = func_get_args();
	}

	/**
	 * Add a test
	 * @param $name Test name
	 * @param $input Array of input pin names
	 * @param $output Array of output pin names
	 * @param $test Either: Array of tests, each an array of values
	 *  -or- function to compute result
	 * @param $staff True if only staff members see this test
	 */
	public function add_test($name, $input, $output, $test, $staff=false) {
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

	public function present_tests() {
		$html = \Toggle::begin("Expand for testing truth table", "p");

		foreach($this->tests as $test) {
			$html .= "<h3>" . $test["name"] . "</h3>";

			$html .= '<table class="truth-table"><tr>';
			foreach($test["input"] as $input) {
				$html .= "<th>$input</th>";
			}

			$first = true;
			foreach($test["output"] as $output) {
				if($first) {
					$html .= "<th class=\"border\">$output</th>";
					$first = false;
				} else {
					$html .= "<th>$output</th>";
				}

			}
			$html .= "</tr>";

			foreach($test["test"] as $row) {
				$html .= "<tr>";
				$i = 0;
				foreach($row as $cell) {
					if($i == count($test["input"])) {
						$html .= "<td class=\"border\">$cell</td>";
					} else {
						$html .= "<td>$cell</td>";
					}

					$i++;
				}
				$html .= "</tr>";
			}

			$html .= '</table>';
		}

		$html .= \Toggle::end();
		return $html;
	}

	/**
	 * Set a user to view circuits for. This overrides the default
	 * behavior of the current user. This is mainly for grading purposes.
	 * @param \User $user User to view
	 */
	public function set_other_user(\User $user) {
		$this->other_user = $user;
	}

	private function new_id() {
		self::$unique++;
		$this->id = "cirsim-" . self::$unique;
	}

	public function set_id($id) {
		$this->id = $id;
	}

	private $id = null;

	private $assignment = null;
	private $tag = null;
	private $name = null;
	private $only = null;		///< Optional list of only certain components allowed
	private $tests = array();
	private $other_user = null;
	private $js = '';
	private $tabs = array();	///< Any additional tabs to add
	private $imports = array();	///< Any tab imports possible
}