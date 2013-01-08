var range:int = 50;
var swingRadius:float = .5;
var coolDown:float = 3.0;
var damage:int = 1;

private var target:GameObject;
private var coolDownTimer:float;
private var playerCombat:PlayerCombat;

function Start () {
	target = GameObject.FindWithTag("Player");
	playerCombat = target.GetComponent(PlayerCombat);
	
	coolDownTimer = 0;
}

function Update () {
	if (coolDownTimer > 0)
		coolDownTimer -= Time.deltaTime;
		
	if (coolDownTimer < 0)
		coolDownTimer = 0;
		
	if (coolDownTimer == 0) {
		attack();
		coolDownTimer = coolDown;
			
	}
		
}

function attack() {
	//Find Distance to player
	var distance:float = Vector3.Distance(target.transform.position, transform.position);
		
	//If player is in range
	if (distance <= range) {
		//Get their health script
		var player:PlayerHealthScript = target.GetComponent(PlayerHealthScript);
			
		//Get their relative position around (this) enemy
        var dir:Vector3 = (player.transform.position - transform.position).normalized;
        var direction:float = Vector3.Dot(dir, transform.forward);
        		
       	//If player is within the swing radius
        if (direction > (1 - swingRadius)) { //If target is in your swing radius
        	if (!playerCombat.shielding)
        		player.modHealth(-damage);
        		
        }
        	
	}

}