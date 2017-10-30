
class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
	this.fsm=config;
	this.currentstate=config.initial;
	this.und='';this.red='';
}

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
	return this.currentstate;
}

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
	var is=false;
	for (var key in this.fsm.states)
   {

	if(key===state)
	{
		is=true;
		this.und=this.currentstate;
		this.currentstate=state;
		this.red=this.currentstate;
		break;
	}
   }
	if(!is)
	{throw new Error('There is no such state');}

}

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
	var is=false;
	for(var key in this.fsm.states[this.currentstate].transitions)
{
	if(key===event)
	{
		is=true;
		this.und=this.currentstate;
		this.currentstate=this.fsm.states[this.currentstate].transitions[event];
		this.red=this.currentstate;
		break;
	}
}
	if(!is)
	{throw new Error('There is no such event');}
}

    /**
     * Resets FSM state to initial.
     */
    reset() {
	this.currentstate=this.fsm.initial;
}

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
	var arr=[];
	if(event===undefined)
	{
		for(var key in this.fsm.states)
		{
		arr.push(key);
		}
	return arr;
	}
	for (var key in this.fsm.states)
	{

		if(this.fsm.states[key].transitions[event]!==undefined)
		{
	   	arr.push(key);
		}
	}
	if(arr.length===0)
	{
	return [];
	}
	return arr;
}

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
	if (this.und.length===0)
	{
	return false;
	}
	else
	{
	this.currentstate=this.und;
	this.und='';
	return true;
	}
}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
	if (this.red.length===0)
	{
	return false;
	}
	else
	{
	this.currentstate=this.red;
	this.red='';
	return true;
	}

}

    /**
     * Clears transition history
     */
    clearHistory() {
	this.und='';
	this.red='';
}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
