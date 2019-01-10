<?php
/**
 * @file
 * Class that describes a question that is answered using Cirsim
 */

namespace CL\Cirsim;

use \CL\Site\Site;
use \CL\Users\User;

/**
 * Describes a question that is answered using Cirsim
 */
class QuizQuestionCirsim extends \CL\Quiz\QuizQuestion {

	/** Constructor */
	public function __construct() {
		parent::__construct();

		$this->cirsim = new CirsimViewAux();

		$this->mustProvideMessage = 'Must click Test before submitting quiz result';

		// This is the value that must be returned on a test success for this question.
		$this->success = mt_rand(1, mt_getrandmax());
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

			case 'success':
				return $this->success;

			default:
				return parent::__get($property);
		}
	}
	
	/** Magic method to set parameters for the question
	 *
	 * This version accepts answer. See also the base class
	 * (QuizQuestion::__set()) version.
	 *
	 * If the name property is set, that name will be used as the name for
	 * the cirsim file instead of the question filename.
	 *
	 * @param string $property Name of private member to set
	 * @param mixed $value Value to set
	 */
	public function __set($property, $value) {
		switch($property) {
			case 'name':
				$this->name = $value;
				break;

			case 'appTag':
				$this->appTag = $value;
				break;

			default:
				parent::__set($property, $value);
				break;
		}
	}


    /**
	 * Present the question to the user
     * @param Site $site The Site object
     * @param User $user The current User object
     * @return string HTML for the quiz question
	 */
	public function present(Site $site, User $user) {
		$html = parent::present($site, $user);

		/*
		 * The question
		 */
		$html .= $this->text;

		$name = $this->name !== null ? $this->name : $this->file;
		$appTag = $this->appTag !== null ? $this->appTag : $this->quiz->assignTag;
		$this->cirsim->single($appTag, $name);

		//
		// Place for the test result and circuit data
		//
		$html .= <<<HTML
<input type="hidden" class="cl-answer-required" name="cl-cirsim-answer">
<input type="hidden" name="cl-cirsim-circuit">
HTML;

		return $html;
	}


	/**
	 * Present content after the Quiz box. This is used to
	 * add in things like the Cirsim IDE or the Playground
	 * @param Site $site
	 * @param User $user
	 * @return string
	 */
	public function presentAfter(Site $site, User $user) {
		$cirsim = $this->cirsim;

		// Add result/circuit/success to each test
		$tests = $cirsim->tests;
		for($i=0; $i<count($tests); $i++) {
			$tests[$i]['result'] = 'input[name="cl-cirsim-answer"]';
			$tests[$i]['circuit'] = 'input[name="cl-cirsim-circuit"]';
			$tests[$i]['success'] = $this->success;
		}
		$cirsim->tests = $tests;

		return $cirsim->present_div($site, $user);
	}
    
	/**
	 * Handle a submit of the question answer from the POST page
	 * @return string HTML for the question
	 */
    public function submit(Site $site, User $user, $post) {

    	$answer = $post['cl-cirsim-answer'];
		$circuit = $post['cl-cirsim-circuit'];

	    $html = $this->text;
		$good = +$answer === $this->success;

	    $this->correct = $good ? $this->points : 0;
        $this->studentanswer = $circuit;
		
    	// Did they get it right?
        if($good) {
        	$html .= "Your circuit was correct!";
        } else {
			$html .= "Your circuit was incorrect!";

           	if($this->comment != null) {
             	$html .= "<div class=\"centerbox primary\">$this->comment</div>";
            } 
        }
		
		$this->rightanswer = "";
		return $html;
    }

	/**
	 * Return answers for the question when viewed in preview mode.
	 * @return array of answer options
	 */
	public function previewerAnswers(Site $site) {
		return $this->answers;
	}

	/**
	 * @return CirsimViewAux Cirsim ViewAux object
	 */
	public function get_cirsim() {
		return $this->cirsim;
	}

	// If a name is provided, that name is used for the single save name
	private $name = null;

	// If an appTag is provided, it is used as the appTag for single save mode
	private $appTag = null;

	private $answers = [];
	private $cirsim;
	private $success;
}
