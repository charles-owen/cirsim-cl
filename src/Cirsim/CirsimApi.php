<?php
/**
 * @file
 * API Resource for /api/cirsim
 */

namespace CL\Cirsim;

use CL\Site\Site;
use CL\Site\System\Server;
use CL\Site\Api\JsonAPI;
use CL\Site\Api\APIException;
use CL\Users\Api\Resource;
use CL\Users\User;
use CL\Users\Users;


class CirsimApi extends \CL\Users\Api\Resource {

	/**
	 * CirsimApi constructor.
	 */
	public function __construct() {
		parent::__construct();
	}

	/**
	 * Dispatch to this component from the router.
	 * @param Site $site The Site configuration object
	 * @param Server $server The Server object
	 * @param array $params Parameters after the path
	 * @param array $properties Properties from the path, should be empty
	 * @param int $time Time stamp
	 * @return JsonAPI Result
	 * @throws APIException On error
	 */
	public function dispatch(Site $site, Server $server, array $params, array $properties, $time) {
		$user = $this->isUser($site);

		switch($params[0]) {

//			case 'load':
//				return $this->load($site, $user, $server, $params, $time);
//
//			case 'upload':
//				return $this->upload($site, $user, $server, $params, $time);
//
//			case 'applications':
//				return $this->applications($site, $user, $server);
//
//			case 'tables':
//				return $this->tables($site, $server, new FileSystemTables($site->db));
		}

		throw new APIException("Invalid API Path", APIException::INVALID_API_PATH);
	}

}