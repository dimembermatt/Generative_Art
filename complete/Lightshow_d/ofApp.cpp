#include "ofApp.h"

//--------------------------------------------------------------
Particle::Particle(){
    int speed = 5;
    this->position[0] = ofRandom(25, ofGetWidth()-25);
    this->position[1] = ofRandom(25, ofGetHeight()-25);
    this->vector[0] = ofRandom(0, speed) - speed/2;
    this->vector[1] = ofRandom(0, speed) - speed/2;
}

Particle::Particle(int speed){
    this->position[0] = ofRandom(25, ofGetWidth()-25);
    this->position[1] = ofRandom(25, ofGetHeight()-25);
    this->vector[0] = ofRandom(0, speed) - speed/2;
    this->vector[1] = ofRandom(0, speed) - speed/2;
}

Particle::Particle(int position[2], int vector[2]){
    this->position[0] = position[0];
    this->position[1] = position[1];
    this->vector[0] = vector[0];
    this->vector[1] = vector[1];
}

void Particle::reflect(float angle){
    int xDiff = cos(2*angle)*vector[0] + sin(2*angle)*vector[1];
    int yDiff = sin(2*angle)*vector[0] - cos(2*angle)*vector[1];
    this->vector[0] = xDiff;
    this->vector[1] = yDiff;
}

bool Particle::intersects(Mirror other){
    float det, xDiff1, xDiff2, yDiff1, yDiff2;
    xDiff1 = this->vector[0];
    yDiff1 = this->vector[1];
    xDiff2 = other.vector[0];
    yDiff2 = other.vector[1];

    det = xDiff2*(-yDiff1) - yDiff2*(-xDiff1);
    if(det != 0){
        float lambda1, lambda2;
        lambda1 = (-yDiff2*(this->position[0] - other.position[0]) +
            xDiff2*(this->position[1] - other.position[1]))/det;
        lambda2 = (-yDiff1*(this->position[0] - other.position[0]) +
            xDiff1*(this->position[1] - other.position[1]))/det;
        if(0 <= lambda1 && lambda1 <= 1 && 0 <= lambda2 && lambda2 <= 1){
            //get point of intersection
            // int pos[2] = {
            //     this->position[0] + lambda1*xDiff1,
            //     this->position[1] + lambda1*yDiff1
            // };
            return true;
        }
    }
    //if 0 or outside of lambdas, return 0
    return false;
}
//--------------------------------------------------------------
Mirror::Mirror(){
    this->position[0] = ofRandom(40, ofGetWidth()-40);
    this->position[1] = ofRandom(40, ofGetHeight()-40);
    this->vector[0] = round(ofRandom(-20, 20))*2;
    if(ofRandom(0, 10) >= 5)
        this->vector[1] = this->vector[0];
    else
        this->vector[1] = -this->vector[0];

}

Mirror::Mirror(int position[2], int vector[2]){
    this->position[0] = position[0];
    this->position[1] = position[1];
    this->vector[0] = vector[0];
    this->vector[1] = vector[1];
}

float Mirror::getOAngle(){
    return atan(vector[1]/vector[0]);
}

//--------------------------------------------------------------
void ofApp::setup(){
    // create a set of randomly placed unit length rays
    for(int i = 0; i < 200; i++){
        Particle p = Particle(50);
        rays.push_back(p);
    }

    // create a set of randomly placed and randomly sized non-intersecting reflectionAxes
    for(int i = 0; i < 40; i++){
        Mirror m = Mirror();
        reflectionAxes.push_back(m);
    }

    int pos[2];// = {15, 15};
    int vel[2];// = {2, 2};
    // Particle p = Particle(pos, vel);
    // rays.push_back(p);

    // pos[0] = 300;
    // pos[1] = 200;
    // vel[0] = -200;
    // vel[1] = 100;
    // Mirror m = Mirror(pos, vel);
    // reflectionAxes.push_back(m);

    //edge axes
    pos[0] = 0;
    pos[1] = 0;
    vel[0] = 0;
    vel[1] = ofGetHeight();
    Mirror e1 = Mirror(pos, vel);
    reflectionAxes.push_back(e1);

    pos[0] = 0;
    pos[1] = 0;
    vel[0] = ofGetWidth();
    vel[1] = 0;
    Mirror e2 = Mirror(pos, vel);
    reflectionAxes.push_back(e2);

    pos[0] = ofGetWidth();
    pos[1] = 0;
    vel[0] = 0;
    vel[1] = ofGetHeight();
    Mirror e3 = Mirror(pos, vel);
    reflectionAxes.push_back(e3);

    pos[0] = 0;
    pos[1] = ofGetHeight();
    vel[0] = ofGetWidth();
    vel[1] = 0;
    Mirror e4 = Mirror(pos, vel);
    reflectionAxes.push_back(e4);
}

//--------------------------------------------------------------
void ofApp::update(){
    for(unsigned long int i = 0; i < rays.size(); i++){
        //move each unit length ray by one unit in heading
        rays[i].position[0] += rays[i].vector[0];
        rays[i].position[1] += rays[i].vector[1];

        //check each ray against every axis
        for(unsigned long int j = 0; j < reflectionAxes.size(); j++){
            //if ray intersects with axis, determine the angle of intersection
            if(rays[i].intersects(reflectionAxes[j])){ //0, no intersection
                //get the perpendicular vector angle w.r.t. 0pi to axis
                //replace with reflected ray
                rays[i].reflect(reflectionAxes[j].getOAngle());
                break;  //hitting one axis means no other is hit
            }
        }
    }
}

//--------------------------------------------------------------
void ofApp::draw(){
    ofBackground(0);
    ofSetLineWidth(4.0);
    //draw rays
    for(unsigned long int i = 0; i < rays.size(); i++){
        ofSetColor((int)ofRandom(255), (int)ofRandom(255), (int)ofRandom(255));
        ofPolyline line;
        line.addVertex(ofPoint(
            rays[i].position[0],
            rays[i].position[1]));
        line.addVertex(ofPoint(
            rays[i].position[0] + rays[i].vector[0],
            rays[i].position[1] + rays[i].vector[1]));
        line.draw();
    }

    if(showMirrors){
        ofSetLineWidth(1.0);
        //draw reflection axes
        ofSetColor(255, 255, 255);
        for(unsigned long int i = 0; i < reflectionAxes.size(); i++){
            ofPolyline line;
            line.addVertex(ofPoint(
                reflectionAxes[i].position[0], reflectionAxes[i].position[1]));
            line.addVertex(ofPoint(
                reflectionAxes[i].position[0] + reflectionAxes[i].vector[0],
                reflectionAxes[i].position[1] + reflectionAxes[i].vector[1]));
            line.draw();
        }
    }
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){
    if(showMirrors)
        showMirrors = false;
    else
        showMirrors = true;
}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){
    reflectionAxes[mirrorN].position[0] = x;
    reflectionAxes[mirrorN].position[1] = y;
}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){
    mirrorN = (mirrorN + 1)%reflectionAxes.size();

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){

}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){

}
