<?php
/** @file
 * Class that describes a question that is answered using Cirsim
 */

namespace Cirsim;

/** Describes a question that is answered using Cirsim
 */
class QuizQuestionCirsim extends \Quiz\QuizQuestion {

	/** Constructor */
	public function __construct() {
		parent::__construct();

		$this->cirsim = new CirsimViewAux();
	}
	
	/** Magic method to set parameters for the question
	 *
	 * This version accepts answer. See also the base class
	 * (QuizQuestion::__set()) version.
	 *
	 * If the name property is set, that name will be used as the name for
	 * the cirsim file instead of the question filename.
	 *
	 * @param $name Name of private member to set
	 * @param $value Value to set
	 */
	public function __set($name, $value) {
		switch($name) {
			case 'name':
				$this->name = $value;
				break;

			default:
				parent::__set($name, $value);
				break;
		}
	}


    /**
	 * Present the question to the user
     * @param string $sessionName The name of the session variable for the QuizSession object
     * @param $preview TRUE if staff preview mode
     * @returns string HTML for the quiz question
	 */
	public function present(\User $user, $sessionName, $preview=false) {
		$html = parent::present($user, $sessionName, $preview);

		$libroot = $this->quiz->get_assignment()->get_course()->get_libroot();

		if($this->name !== null) {
			$this->cirsim->single($this->quiz->get_assignment()->get_tag(),
				$this->name,
				$this->name);
		} else {
			$this->cirsim->single($this->quiz->get_assignment()->get_tag(),
				$this->quiz->get_tag(),
				$this->get_file());
		}


		/*
		 * The question
		 */
		$html .= $this->text;

		$course = $user->get_course();
		$this->cirsim->set_id("cirsim");
		$html .= $this->cirsim->present_script($course, $user);

		/*
		 * Either answer preview or answer submission form
		 */
		if($preview) {
			$html .= "<hr />";

			$html .= $this->cirsim->present_tests();

			// Comment preview
			if($this->comment !== null) {
				$html .= "<p>Comment:</p>";
				$html .= $this->comment;
			}
		} else {
			$html .= <<<END
<form id="question" action="" method="post"><p>
<input type="hidden" name="answer" id="answer">
<input type="hidden" name="circuit" id="circuit">
<input name="Submit" type="submit" value="submit" /> <span id="message" class="smallred">&nbsp;</span>
END;
			
			$html .= <<<END
<br /></p></form><script>
var present_post = function() {
	$('#question').submit(function(event) {
	    event.preventDefault();
		var answer = $("#answer").val();
		var circuit = $("#circuit").val();
		if(answer == "") {
			$('#message').text("Must click the Test option before submitting");
		} else {
			var data = {session: '$sessionName', cmd: 'submit', answer: answer, circuit: circuit};
			$.ajax({
				type: "POST",  
				url: "$libroot/quiz/quiz-post.php",
				data: data,
				success: function(data) {
					$("#quiz").html(data);
					present_post();
				}  
			}); 
		}
		return false; // prevent default
	});	
}
END;
			$html .= "</script>";
		}
		
		return $html;
	}
	

    
	/** Handle a submit of the question answer from the POST page
	 * @returns HTML for the question */
    public function submit($post) {
    	$answer = trim(htmlentities($post['answer']));
		$circuit = $post['circuit'];
        
    	$html = $this->text;
		$good = $answer === "success";

		$this->correct = $good ? $this->get_points() : 0;
        $this->studentanswer = $circuit;
		
    	// Did they get it right?
        if($good) {
        	$html .= "<hr><p>Your circuit was correct!</p>";
        } else {
			$html .= "<hr><p>Your circuit was incorrect!</p>";

           	if($this->comment != null) {
             	$html .= "<div class=\"centerbox primary\">$this->comment</div>";
            } 
        }
		
		$this->rightanswer = "";
		return $html;
    }

    public function get_cirsim() {
		return $this->cirsim;
	}

    private $cirsim;

	/// If a name is provided, that name is used for the single view tag and name
	private $name = null;
}
