#pragma once

#include "ofMain.h"

class Mirror{
	public:
		int position[2];
		float vector[2];
		Mirror();
		Mirror(int position[2], int vector[2]);
		float getOAngle();
};

class Particle{
	public:
		int position[2];
		float vector[2];
		Particle();
		Particle(int speed);
		Particle(int position[2], int vector[2]);
		void reflect(float angle);
		bool intersects(Mirror other);
};

class ofApp : public ofBaseApp{
	private:
		vector <Particle> rays;
		vector <Mirror> reflectionAxes;
		bool showMirrors = true;
		int mirrorN = 0;
	public:
		void setup();
		void update();
		void draw();

		void keyPressed(int key);
		void keyReleased(int key);
		void mouseMoved(int x, int y );
		void mouseDragged(int x, int y, int button);
		void mousePressed(int x, int y, int button);
		void mouseReleased(int x, int y, int button);
		void mouseEntered(int x, int y);
		void mouseExited(int x, int y);
		void windowResized(int w, int h);
		void dragEvent(ofDragInfo dragInfo);
		void gotMessage(ofMessage msg);
};
