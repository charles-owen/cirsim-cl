<?php


namespace CL\Cirsim\Tasks;


use CL\Grades\GradePart;
use CL\Site\Site;
use CL\Users\Selector;
use CL\Users\User;

class Sequence extends GradePart {

    public function __construct($name, $length, $width) {
        parent::__construct(0, "grade-sequence-$length-$width");
        $this->length = $length;
        $this->width = $width;
        $this->__set("name", $name);
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
            case 'salt':
                $this->salt = $value;
                break;

            case 'cirsim':
                $this->cirsim = $value;
                break;

            default:
                parent::__set($property, $value);
                break;
        }
    }

    public function get_sequence(User $user) {
        $selector = new Selector($user, $this->salt);
        $max = $this->length * $this->width;
        $range = $max * 3 / 10;


        do {
            $sequence = [];
            $count = 0;
            for($i=0; $i<$this->length; $i++) {
                $code = [];
                for($j=0; $j<$this->width; $j++) {
                    $bit = $selector->get_rand() & 1;
                    $code[] = $bit;
                    $count += $bit;
                }

                $sequence[] = $code;
            }

        } while($count < $range || $count > ($max - $range));

        if($user->staff) {
            $sequence = [[1, 1], [0, 1], [1, 0], [1, 1], [1, 0]];
        }

        $this->sequence = $sequence;

        $table = '<div class="left"><table class="truth-table noshadow">';
        $pretty = $this->pretty_sequence($sequence);
        $outputs = '';
        $table .= '<tr>';
        for($i=1; $i<=$this->width; $i++) {
            if($i > 1 && $this->width > 2) {
                $outputs .= ", ";
            }
            if($i === $this->width) {
                $outputs .= " and ";
            }

            $outputs .= "O$i";
            $table .= "<th>O$i</th>";
        }
        $table .= "</tr>";

        foreach($sequence as $code) {
            $table .= '<tr>';
            foreach($code as $bit) {
                $table .= "<td>$bit</td>";
            }
            $table .= '</tr>';
        }

        $table .= "</table></div>";

        $first = $this->pretty_code($sequence[0]);
        $rest = $this->pretty_sequence(array_slice($sequence, 1));



        $html = <<<HTML
<p>In the Cirsim window below, create a finite state machine. Your circuit must output the sequence $pretty and then 
 repeat. </p>
 
 <p>It should have 
{$this->width} outputs named $outputs and two buttons. Output O1 is the most significant bit of the output sequence 
values. The buttons must be named CLK
and RESET (upper case). When the RESET button is pressed, the output is $first. If the 
 clock is then applied ten times, the output will be $rest, $pretty. Note that 
 some values in this sequence repeat!</p>
 $table

HTML;


        return ['sequence'=>$sequence,
            'pretty'=>$pretty,
            'html'=>$html
        ];
    }

    private function pretty_sequence($sequence) {
        $str = '';
        foreach($sequence as $code) {
            if(strlen($str) > 0) {
                $str .= ', ';
            }

            $str .= $this->pretty_code($code);
        }

        return $str;
    }

    private function pretty_code($code) {
        $str = '';
        foreach($code as $bit) {
            $str .= $bit;
        }
        return $str;
    }

    public function add_test_to($cirsim) {
        $this->cirsim = $cirsim;
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

        $name = $user->displayName;
        $sequence = $this->get_sequence($user);

        $data['html'] = "<p>The sequence for $name is {$sequence['pretty']}</p>";

        if($this->cirsim !== null) {
            $seq = $sequence['sequence'];
            $test = [
                [0, 1, $seq[0][0], $seq[0][1]],
                [0, 0, $seq[0][0], $seq[0][1]]
            ];

            $resetOnly = $test;

            for($i=1; $i<count($seq);  $i++) {
                $test[] = [1, 0, $seq[$i][0], $seq[$i][1]];
                $test[] = [0, 0, $seq[$i][0], $seq[$i][1]];
            }

            $onceOnly = $test;

            for($i=0; $i<count($seq);  $i++) {
                $test[] = [1, 0, $seq[$i][0], $seq[$i][1]];
                $test[] = [0, 0, $seq[$i][0], $seq[$i][1]];
            }

            for($i=0; $i<count($seq);  $i++) {
                $test[] = [1, 0, $seq[$i][0], $seq[$i][1]];
                $test[] = [0, 0, $seq[$i][0], $seq[$i][1]];
            }

            $this->cirsim->add_test("Test0", ["type:Button:CLK", "type:Button:RESET"],
                ["O1", "O2"], $resetOnly);
            $this->cirsim->add_test("Test1", ["type:Button:CLK", "type:Button:RESET"],
                ["O1", "O2"], $onceOnly);
            $this->cirsim->add_test("Test2", ["type:Button:CLK", "type:Button:RESET"],
                ["O1", "O2"], $test);

        }

        return $data;
    }

    /**
     * Compute the grade for this assignment
     * Zero for this part, since this is not a part that is graded
     * @param int $memberId Member we are grading
     * @param array $grades Result from call to getUserGrades
     * @return array with keys 'points' and optionally 'override'
     */
    public function computeGrade($memberId, array $grades) {
        return ['points'=>0];
    }

    private $length;
    private $width;
    private $salt = "Sequencer1";
    private $sequence = [];
    private $cirsim = null;
}