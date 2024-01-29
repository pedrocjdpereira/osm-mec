import json

import cherrypy


def jsonify_error(status, message, traceback, version):
    """JSONify all CherryPy error responses (created by raising the
    cherrypy.HTTPError exception)
    """

    cherrypy.response.headers["Content-Type"] = "application/json"
    response_body = json.dumps(
        {
            "error": {
                "http_status": status,
                "message": message,
            }
        }
    )

    cherrypy.response.status = status

    return response_body


def load_env(env_file):
    """Load environment variables from a file"""
    with open(env_file) as f:
        env = dict(
            tuple(line.strip().split("=")) for line in f if not line.startswith("#")
        )
    return env
