<?php
/**
 * @file
 *
 * This is the base class for classes written configure
 * CirsimViewAux. This allows for a configuration to be
 * deferred to grading time.
 */

namespace Cirsim;

/**
 * This is the base class for classes written configure
 * CirsimViewAux. This allows for a configuration to be
 * deferred to grading time.
 */
class CirsimConfigurator {

	public function configure(\Assignments\Assignment $assignment,
							  CirsimViewAux $cirsim, \User $user, $grading=false) {}
}