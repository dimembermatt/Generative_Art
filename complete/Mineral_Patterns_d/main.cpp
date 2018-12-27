#include "ofMain.h"
#include "ofApp.h"
/**
 *	@Author: Matthew Yu
 *	@Title:	Mineral Patterns (GA notebook 006)
 *	@Last Modified: 12/25/18
 *	@Bugs:	Around >15 vertices appears to be some vertex overlap towards 2PI rad
 */

//========================================================================
int main( ){
	ofSetupOpenGL(600, 600, OF_WINDOW);			// <-------- setup the GL context

	// this kicks off the running of my app
	// can be OF_WINDOW or OF_FULLSCREEN
	// pass in width and height too:
	ofRunApp(new ofApp());

}
