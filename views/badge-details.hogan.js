<h1>{{badge.name}}</h1>
<div class="row">
	<div class="span16 columns badge-image">
		<img id="badge-image" src="{{attributes.image_path}}" alt="Badge Image"/>
	</div>
  <div class="span6 columns badge-details">
    <dl>
      <dt>Recipient</dt>
      <dd>{{assertion.recipient}}</dd>

      <dt>Name</dt>
      <dd>{{badge.name}}</dd>

      <dt>Description</dt>
      <dd>{{badge.description}}</dd>

      <dt>Criteria</dt>
      <dd><a href="{{badge.criteria}}">{{badge.criteria}}</a></dd>

      <dt>Issuer</dt>
      <dd>{{issuer.name}} (<a href="{{issuer.origin}}">{{issuer.origin}}</a>)</dd>

      {{#type.issuer.org}}
      <dt>Organization</dt>
      <dd> {{type.issuer.org}} </dd>
      {{/type.issuer.org}}
    </dl>

		<h3>Share these Badges:</h3>
		<div class="share-badge"><div class="fb-login-button"></div></div>

		{{#owner}}
		  <form action="{{ deleteRoute }}" method="post" style="display: inline">
		    <input type="hidden" name="_csrf" value="{{ csrfToken }}"></input>
		    <input type="hidden" name="_method" value="delete"></input>
		    <input class="btn btn-danger" type="submit" value="Delete this badge."></input>
		  </form>
	  {{/owner}}
  </div>
</div>

<script type="text/javascript">
(function() {

  coffeescript(function() {
    var autocheck, checkboxes, newGroup, shortDisable, watchChanges;
    newGroup = $('#new-group');
    checkboxes = $('.input-append input[type=checkbox]');
    watchChanges = function(event) {
      var elem, input, label;
      elem = $(this);
      label = elem.parent();
      input = label.siblings('input').first();
      if (elem.attr('checked')) {
        label.addClass('active');
        if (!input.val()) return input.trigger('focus');
      } else {
        return label.removeClass('active');
      }
    };
    autocheck = function(event) {
      var checkbox, checked, elem;
      elem = $(this);
      checkbox = elem.siblings('label').first().find('input');
      checked = elem.val() ? true : false;
      return checkbox.attr('checked', checked).trigger('change');
    };
    shortDisable = function() {
      var checkbox, elem;
      elem = $(this);
      checkbox = elem.siblings('label').first().find('input');
      checkbox.attr('disabled', true);
      return setTimeout(function() {
        return checkbox.attr('disabled', false);
      }, 20);
    };
    checkboxes.bind('change', watchChanges).trigger('change');
    return newGroup.bind('keydown', autocheck).bind('blur', autocheck).bind('blur', shortDisable);
  });
</script>
<script>
(function() {

  coffeescript(function() {
    var image;
    image = $('#badge-image');
    return image.bind('load', function(event) {
      if (this.clientWidth > 256) {
        return $(this).css({
          width: '256px'
        });
      }
    });
  });

}).call(this);
</script>
