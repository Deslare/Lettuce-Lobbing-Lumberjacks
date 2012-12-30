var maxHealth:float = 100;
var curHealth:float = maxHealth;

private var healthBarLength:float = maxHealth/curHealth;

function Start () {
	healthBarLength = Screen.width / 2;

}

function Update () {


}

function OnGUI() {
	GUI.Box(new Rect(10, 10, healthBarLength, 20), Mathf.Round((curHealth/maxHealth) * 100) + "%");

}

function modHealth(mod) {
	curHealth += mod;
	
	if (curHealth < 0) //No negative health
		curHealth = 0;
		
	if (curHealth > maxHealth) //No overheal
		curHealth = maxHealth;
		
	if (maxHealth < 1) //Divide by 0 contingency
		maxHealth = 1;
	
	healthBarLength = (Screen.width / 2) * (curHealth / maxHealth);

}