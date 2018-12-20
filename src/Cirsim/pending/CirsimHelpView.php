<?php
/**
 * Created by PhpStorm.
 * User: cbowen
 * Date: 5/30/2016
 * Time: 6:20 PM
 */

namespace Cirsim;


class CirsimHelpView extends \View {

	public function __construct(\Course $course, \User $user) {
		parent::__construct($course, $user);

		$cirsimRoot = $course->get_root() . '/cirsim';
		$t = filemtime(__DIR__ . '/../../cirsim.css');
		$this->add_rel_css($cirsimRoot . "/cirsim.css?t=$t");
		$this->add_jqueryui();
		$this->add_js("js/jquery.hotkeys.js");
		$this->add_rel_js($cirsimRoot . '/node_modules/buckets-js/dist/buckets.min.js');

		if($course->get_sandbox()) {
			$t = filemtime(__DIR__ . '/../../cirsim.con.js');
			$this->add_rel_js($cirsimRoot . '/cirsim.con.js?t=' . $t);
		} else {
			$t = filemtime(__DIR__ . '/../../cirsim.min.js');
			$this->add_rel_js($cirsimRoot . '/cirsim.min.js?t=' . $t);
		}
	}

	/**
	 * Present the page header
	 * @return string HTML for page header
	 */
	public function header() {
		$root = $this->course->get_root();
		$cirsimRoot = $this->course->get_root() . '/cirsim';

		$html = <<<HEAD
<div id="body">
<header>
<img alt="Logo icon" src="$cirsimRoot/images/logo-small.png">
<H1>$this->title</H1>
<nav>$this->nav</nav>
</header>
HEAD;
		return $html;
	}

	/**
	 * Present the page tail
	 * @return HTML for the page tail
	 */
	public function tail() {
		$root = $this->course->get_home();
		$cirsimRoot = $this->course->get_root() . '/cirsim';

		$html = <<<HTML
<footer><p>
<img alt="Logo icon" src="$cirsimRoot/images/logo-small.png">
</p></footer></div>
HTML;
		return $html;
	}

	public function add_link($to, $href) {
		if(strlen($this->nav) > 0) {
			$this->nav .= ' | ';
		}

		$this->nav .= "<a href=\"$href\">$to</a>";
	}

	private $nav = '';
}