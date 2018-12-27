#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    cout << "Enter #Vertices (>2): ";
    cin >> VERTICES;
    cout << "Enter #BASE_STEP (>1): ";
    cin >> BASE_STEP;

    int center[2] = {ofGetWidth()/2, ofGetHeight()/2};
    ofPolyline layer1;
    float baseColor = ofRandom(255);

    int i = 0;
    while(i < VERTICES){
        angleSet.push_back(i*TWO_PI/VERTICES + ofRandom(-TWO_PI/VERTICES/3, TWO_PI/VERTICES/3));
        layer1.addVertex(ofPoint(cos(angleSet[i]) + center[0],
            sin(angleSet[i]) + center[1], baseColor));
        i++;
    }
    layers.push_back(layer1);
}

//--------------------------------------------------------------
void ofApp::update(){
}

//--------------------------------------------------------------
void ofApp::draw(){
    ofBackground(0);
    ofSetLineWidth(2.0);  // Line widths apply to polylines
    for (int i = layers.size()-1; i >= 0; i--){
        ofSetColor((255+7*i)%256, layers[i][0][2],(17*i)%256);
        ofFill();
        ofBeginShape();
            for(int j = 0; j < layers[i].size(); j++){
                ofVertex(layers[i][j][0], layers[i][j][1]);
            }
        ofEndShape();
    }
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){
    if(key == 110){
        layers.clear();
        setup();
    }
    else if(key == 115){
        static int run = 2;
        img.grabScreen(0, 0, ofGetWidth(), ofGetHeight());
        img.save("Mineral_Patterns_" + ofToString(run++) + ".jpg");
        cout << "Saved v:" << run << endl;
    }
}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){
    ofPolyline nextLayer, prevLayer;
    prevLayer = layers[layers.size()-1];
    int offset = (int) ofRandom(y);

    int i = 0;
    //offset next layer based on perlin noise mod
    while(i < VERTICES-1){
        float mod = ofNoise(fmod(i+offset%17, TWO_PI)) + ofRandom(0.0, 0.3);
        float radius = mod*BASE_STEP;
        nextLayer.addVertex(ofPoint(cos(angleSet[i])*radius + prevLayer[i][0],
            sin(angleSet[i])*radius + prevLayer[i][1], (int)(mod*100)%255));
        i++;
    }
    //complete circle
    nextLayer.addVertex(nextLayer[0][0], nextLayer[0][1]);

    layers.push_back(nextLayer);
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
