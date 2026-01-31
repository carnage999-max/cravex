import React, { useRef } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from 'three';
import { usePreferences } from '../context/PreferencesContext';
import { COLORS } from '../constants';

interface Props {
    progress: number; // 0 to 1
}

export default function CalibrationAnimation({ progress }: Props) {
    const { reduceMotion } = usePreferences();
    const glViewRef = useRef<GLView>(null);

    const onContextCreate = async (gl: any) => {
        const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

        const renderer = new Renderer({ gl });
        renderer.setSize(width, height);
        renderer.setClearColor(COLORS.background);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 5;

        // A central core with orbiters representing calibration data points
        const coreGeometry = new THREE.IcosahedronGeometry(1, 1);
        const coreMaterial = new THREE.MeshPhongMaterial({
            color: COLORS.primary,
            wireframe: true,
            transparent: true,
            opacity: 0.6,
        });
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        scene.add(core);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);

        const animate = () => {
            if (!reduceMotion) {
                requestAnimationFrame(animate);
                core.rotation.x += 0.005;
                core.rotation.y += 0.008;

                const scale = 0.8 + progress * 0.4;
                core.scale.set(scale, scale, scale);
            }

            renderer.render(scene, camera);
            gl.endFrameEXP();
        };

        animate();
    };

    if (reduceMotion) {
        return (
            <View style={styles.fallbackContainer}>
                <View style={styles.progressTrack}>
                    <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
                </View>
                <Text style={styles.fallbackText}>Calibrating Sensors: {Math.round(progress * 100)}%</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <GLView ref={glViewRef} style={styles.glView} onContextCreate={onContextCreate} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    glView: { flex: 1 },
    fallbackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background
    },
    progressTrack: { width: '80%', height: 8, backgroundColor: COLORS.border, borderRadius: 4, marginBottom: 20, overflow: 'hidden' },
    progressBar: { height: '100%', backgroundColor: COLORS.primary },
    fallbackText: { fontSize: 16, color: COLORS.subtext, fontWeight: '500' }
});
