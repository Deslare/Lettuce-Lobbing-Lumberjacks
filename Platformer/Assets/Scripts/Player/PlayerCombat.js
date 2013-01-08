var range:int = 40;
var swingRadius:float = .7;
var coolDown:float = 1.0;
var damage:int = 20;
var shielding:boolean;

private var coolDownTimer:float;

function Start () {
	coolDownTimer = 0;
}

function Update () {
	if (coolDownTimer > 0)
		coolDownTimer -= Time.deltaTime;
		
	if (coolDownTimer < 0)
		coolDownTimer = 0;
		
	if (Input.GetButtonDown("Fire2"))
		shield(true);
	
	if (Input.GetButtonUp("Fire2"))
		shield(false);

	if (Input.GetButtonDown("Fire1")) {
		Screen.lockCursor = true;
		
	if (coolDownTimer == 0 && !shielding) {
			attack();
			coolDownTimer = coolDown;
			
		}
		
	}

}

function attack() {
	//Collect objects in range
	var targets:Collider[] = Physics.OverlapSphere(transform.position, range);
		
	for (var col:Collider in targets) { //For each found object
		var enemy:EnemyHealthScript = col.GetComponent(EnemyHealthScript);
			
        if (enemy != null) { //If the object has a health script (enemy)
        	var dir:Vector3 = (enemy.transform.position - transform.position).normalized;
        	var direction:float = Vector3.Dot(dir, transform.forward);
        		
        	if (direction > (1 - swingRadius)) { //If target is in your swing radius
        		enemy.modHealth(-damage);
        		
        	}
        		
        }
        	
	}

}

function shield(up:boolean) {
	if (!up)
		shielding = false;

	yield WaitForSeconds(.25);
	
	if (up)
		shielding = true;
		
}