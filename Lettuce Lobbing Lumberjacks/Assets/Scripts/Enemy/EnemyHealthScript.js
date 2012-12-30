var maxHealth:float = 100;
var curHealth:float = maxHealth;
var boss:boolean;

private var healthBarLength:float = maxHealth/curHealth;

function Start () {
	if (boss)
		healthBarLength = Screen.width - 20;

}

function OnGUI() {
	if (boss)
		GUI.Box(new Rect(10, 40, healthBarLength, 20), Mathf.Round((curHealth/maxHealth) * 100) + "%");

}

function modHealth(mod) {
	curHealth += mod;
	
	if (curHealth < 0) //No negative health
		curHealth = 0;
		
	if (curHealth > maxHealth) //No overheal
		curHealth = maxHealth;
		
	if (maxHealth < 1) //Divide by 0 contingency
		maxHealth = 1;
		
	if (curHealth == 0)
		death();
	
	if (boss)
		healthBarLength = (Screen.width - 20) * (curHealth / maxHealth);

}

function death() {
		Destroy(this.gameObject);
}