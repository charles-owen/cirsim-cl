<?php
/**
 * @file
 * Representation of IEEE 754 half-float values.
 *
 * These are used in Cirsim so this provides server-side support for
 * the values.
 */

namespace Cirsim;

/**
 * Representation of IEEE 754 half-float values.
 *
 * These are used in Cirsim so this provides server-side support for
 * the values.
 */
class Float16 {

	public function __set($name, $value) {
		switch($name) {
			case "sign":
				$this->value = ($this->value & 0xefff) | (($value << 15) & 0x8000);
				break;

			case "exp":
				$this->value = ($this->value & 0x83ff) | (($value << 10) & 0x7c00);
				break;

			case "frac":
				$this->value = ($this->value & 0xfc00) | ($value & 0x03ff);
				break;

			case "value":
				$this->value = $value & 0xffff;
				break;

			case "float":
				$this->fmFloat($value);
				break;

			default:
				trigger_error("Property $name does not exist");
				break;
		}

	}

	public function __get($name) {
		switch($name) {
			case "sign":
				return ($this->value) >> 15 & 1;

			case "exp":
				return ($this->value) >> 10 & 0x1f;

			case "frac":
				return $this->value & 0x3ff;

			case "value":
				return $this->value;

			case "float":
				return $this->toFloat();

			default:
				trigger_error("Property $name does not exist");
				break;
		}
	}

	public function toFloat() {
		if($this->exp == 0) {
			return 0;
		}

		$f = $this->frac / 1024 + 1;
		$f *= pow(2, $this->exp - 0xf);
		return $this->sign == 1 ? -$f : $f;
	}

	public function fmFloat($float) {
		$this->value = 0;

		if($float == 0) {
			return;
		}

		if($float < 0) {
			$this->sign = 1;
			$float = -$float;
			echo $this->value . "\n";
		}

		$ex = 0;
		while($float >= 2.0) {
			$ex++;
			$float /= 2;
			if($ex >= 16) {
				$this->exp = 0x7c;	// Infinity
				return;
			}
		}

		while($float < 1.0) {
			$ex--;
			$float *= 2;
			if($ex <= 15) {
				return;		// Too small, this is a zero
			}
		}

		$float -= 1;		// Remove the 1
		$this->frac = (int)($float * 1024);
		echo $this->value . "\n";

		$this->exp = $ex + 0xf;
		echo $this->value . "\n";

	}


	private $value = 0;		///< 16-bit floating point value (as an integer)
}