import React, { Component } from "react";
import * as THREE from "three";
import { Renderer,TextureLoader } from 'expo-three';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';


export default function App(params) {

  const _onGLContextCreate = async gl => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      200, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000
    );
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    const geometry = new THREE.SphereBufferGeometry(1, 36, 36);
    const material = new THREE.MeshBasicMaterial({
      map: new TextureLoader().load(require('./assets/texture.png'))
    });
    const sphere = new THREE.Mesh(geometry, material); 
    
    scene.add(sphere);
    camera.position.z = 2;
    const render = () => {
      requestAnimationFrame(render);
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  };


  return(
    <GLView
      style={{ flex: 1 }}
      onContextCreate={_onGLContextCreate}
    >

    </GLView>
  )
}