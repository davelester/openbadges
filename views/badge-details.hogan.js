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

		{{#owner}}
		<h3>Share these Badges:</h3>
		<div class="share-badge"><div class="fb-login-button"></div></div>

    <h3>Adminsitration</h3>
	  <form action="{{ deleteRoute }}" method="post" style="display: inline">
	    <input type="hidden" name="_csrf" value="{{ csrfToken }}"></input>
	    <input type="hidden" name="_method" value="delete"></input>
	    <input class="btn btn-danger" type="submit" value="Delete this badge."></input>
	  </form>
	  {{/owner}}
  </div>
</div>