var charController:CharacterController;

var speed:float = 40;
var rotationSpeed:float = 5;
var aggroRange:int = 120;
var stopDist:int = 35;

private var jumpForce:float = 150;
private var gravity:float = 250;
private var target:Transform;
private var fallForce:float;
private var self:Transform;
private var lookPos;

function Start() {
	self = transform; //Optimization
	charController = GetComponent(CharacterController);
	
	var go:GameObject = GameObject.FindWithTag("Player"); //Set player to variable
	target = go.transform; //Set target to player variable
}

function Update () {
	Debug.DrawLine(target.position, self.position, Color.red);
	
	
	// Direction /////////////////////////////////////////////////////////////////////////////////
	if (Vector3.Distance(target.position, self.position) < aggroRange) {
		//Look At Target (What the fuck is this shit?)
		lookPos = target.position - self.position;
		lookPos.y = 0; //Don't look up or down
		self.rotation = Quaternion.Slerp(self.rotation,
			Quaternion.LookRotation(lookPos),
			rotationSpeed * Time.deltaTime);
			
		//Move forward
		if (Vector3.Distance(target.position, self.position) > stopDist)
			self.position += self.forward * speed * Time.deltaTime;
		
	}
	
	// Falling ///////////////////////////////////////////////////////////////////////////
	if (charController.isGrounded) { //Reset Jumping and Fall Speed so long as char is on the ground
			fallForce = 0;
	}
	
	if (!charController.isGrounded) { //Ledge Falling
		charController.Move(transform.up * fallForce * Time.deltaTime);
		fallForce -= gravity * Time.deltaTime;
	}

}