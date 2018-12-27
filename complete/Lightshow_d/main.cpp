#include "ofMain.h"
#include "ofApp.h"

/**
 *	@Author: Matthew Yu
 *	@Title:	Lightshow (GA notebook 012)
 *	@Last Modified: 12/27/18
 *	@Bugs:	Mirrors with tilt !(90deg, 45deg) cause particles to lose velocity
 *		over time (float data loss from arctan/cos/sin)
 */

//========================================================================
int main( ){
	ofSetupOpenGL(800,400,OF_WINDOW);			// <-------- setup the GL context

	// this kicks off the running of my app
	// can be OF_WINDOW or OF_FULLSCREEN
	// pass in width and height too:
	ofRunApp(new ofApp());

}
