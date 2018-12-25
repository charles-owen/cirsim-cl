<?php
/**
 * @file
 * Plugin that adds support for Cirsim to a course.
 */

/// Classes in the Cirsim subsystem
namespace CL\Cirsim;

use CL\Site\Site;
use CL\Site\System\Server;
use CL\Site\Router;

/**
 * Plugin that adds server-side support for Cirsim to a course.
 */
class CirsimPlugin extends \CL\Site\Plugin {
	/**
	 * A tag that represents this plugin
	 * @return string A tag like 'course', 'users', etc.
	 */
	public function tag() {return 'cirsim';}

	/**
	 * Return an array of tags indicating what plugins this one is dependent on.
	 * @return array of tags this plugin is dependent on
	 */
	public function depends() {return ['course', 'filesystem'];}

	/**
	 * Amend existing object
	 * The Router is amended with routes for the login page
	 * and for the user API.
	 * @param $object Object to amend.
	 */
	public function amend($object) {
		if($object instanceof Router) {
			$router = $object;

			$router->addRoute(['api', 'cirsim', '*'], function(Site $site, Server $server, array $params, array $properties, $time) {
				$resource = new CirsimApi();
				return $resource->apiDispatch($site, $server, $params, $properties, $time);
			});
		}
	}

}