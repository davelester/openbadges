const _ = require('underscore');
const test = require('tap').test;
const testUtils = require('./');
const backpack = require('../controllers/backpack');
const conmock = require('./conmock');

test('backpack#login', function (t) {
  conmock({
    handler: backpack.login,
    request: {
      session: { _csrf: 'cats' }
    }
  }, function (err, mock) {
    t.same(mock.fntype, 'render', 'should try to render the login page');
    t.same(mock.options['csrfToken'], 'cats', 'should have right csrf token');
    t.end();
  });
});

test('backpack#signout', function (t) {
  conmock({
    handler: backpack.signout,
    request: {
      session: { email: 'brian@example.org' }
    }
  }, function (err, mock, req) {
    t.same(mock.path, '/backpack/login', 'should redirect to the login page');
    t.same(_.keys(req.session).length, 0, 'should wipe out the session');
    t.end();
  });
});

test('backpack#manage', function (t) {
  // #TODO: re-write after making backpack.manage sane.
  t.end();
});

test('backpack#facebookSharing', function (t) {
  conmock({
	  handler: backpack.facebookSharing,
	  request: {
		  body: {
			  accessToken: 'aaBBccDDeFgHiJkLMnOP',
	      badgeBodyHash: 'sillybadgehash',
	      userId: 'me',
	      comment: 'Commenting on my badge so others know how awesome I am!',
	      fbAutomaticPush: 'checked'
		  }
		}
  }, function (err, mock, req) {
    if (err) throw err;
    t.equal(mock.status, 303);
    t.end();
	});
});

testUtils.finish(test);