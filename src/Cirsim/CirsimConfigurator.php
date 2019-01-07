<?php
/**
 * @file
 *
 * This is the base class for classes written to configure
 * CirsimViewAux. This allows for a configuration to be
 * deferred to grading time.
 */

namespace CL\Cirsim;

use CL\Users\User;
use CL\Course\Assignment;

/**
 * This is the base class for classes written configure
 * CirsimViewAux. This allows for a configuration to be
 * deferred to grading time.
 */
class CirsimConfigurator {

	public function configure(Assignment $assignment,
							  CirsimViewAux $cirsim, User $user, $grading=false) {}
}