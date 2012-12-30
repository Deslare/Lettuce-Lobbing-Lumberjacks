var charController:CharacterController;

var speed:float;
var rotationSpeed:float;
var jumpForce:float;
var gravity:float;

private var camFollow:boolean = true;
private var fallForce:float;
private var jumping:boolean;

function Start() {
	charController = GetComponent(CharacterController);
}

function Update () {
	// Direction /////////////////////////////////////////////////////////////////////////////////
	if (Input.GetAxis("Vertical") > 0) { //Forward
		charController.Move(transform.forward * speed * Time.deltaTime);
	}
	else if (Input.GetAxis("Vertical") < 0) { //Back
		charController.Move(transform.forward * -speed * Time.deltaTime);
	}
	
	if (Input.GetAxis("Horizontal") > 0) { //Right
		charController.Move(transform.right * speed * Time.deltaTime);
	}
	else if (Input.GetAxis("Horizontal") < 0) { //Left
		charController.Move(transform.right * -speed * Time.deltaTime);
	}
	
	// Jumping and Falling ///////////////////////////////////////////////////////////////////////////
	if (Input.GetButtonDown("Jump") && !jumping && fallForce > (-gravity * 20) * Time.deltaTime) { //Jump
		jumping = true;
		fallForce = jumpForce;
	}
	
	if (jumping) { //Jump Falling
		charController.Move(transform.up * fallForce * Time.deltaTime);
		fallForce -= gravity * Time.deltaTime;
		
	}
	
	if (charController.isGrounded) { //Reset Jumping and Fall Speed so long as char is on the ground
			jumping = false;
			fallForce = 0;
	}
	
	if (!charController.isGrounded && !jumping) { //Ledge Falling
		charController.Move(transform.up * fallForce * Time.deltaTime);
		fallForce -= gravity * Time.deltaTime;
	}
	
	
	// Camera /////////////////////////////////////////////////////////////////////////////////
	transform.Rotate(Vector3(0, Input.GetAxis("Mouse X") * rotationSpeed * Time.deltaTime, 0));

}