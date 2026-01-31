import React, { useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from 'three';
import { usePreferences } from '../context/PreferencesContext';
import { COLORS } from '../constants';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    isConnecting: boolean;
    isConnected: boolean;
}

export default function DeviceConnectionAnimation({ isConnecting, isConnected }: Props) {
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

        // Subtle shapes
        const geometry = new THREE.SphereGeometry(0.8, 32, 32);
        const mat1Color = isConnected ? COLORS.success : isConnecting ? COLORS.warning : COLORS.primary;
        const material1 = new THREE.MeshPhongMaterial({
            color: mat1Color,
            emissive: mat1Color,
            emissiveIntensity: 0.2,
            transparent: true,
            opacity: 0.8,
        });
        const sphere1 = new THREE.Mesh(geometry, material1);
        sphere1.position.x = -1.5;
        scene.add(sphere1);

        const material2 = new THREE.MeshPhongMaterial({
            color: COLORS.secondary,
            transparent: true,
            opacity: 0.4,
        });
        const sphere2 = new THREE.Mesh(geometry, material2);
        sphere2.position.x = 1.5;
        scene.add(sphere2);

        const points = [new THREE.Vector3(-1.5, 0, 0), new THREE.Vector3(1.5, 0, 0)];
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineMaterial = new THREE.LineDashedMaterial({
            color: isConnected ? COLORS.success : COLORS.border,
            dashSize: 0.2,
            gapSize: 0.1,
        });
        const line = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(line);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);

        const animate = () => {
            if (!reduceMotion) {
                requestAnimationFrame(animate);

                // Very subtle rotation
                sphere1.rotation.y += 0.005;
                sphere2.rotation.y += 0.003;

                if (isConnecting) {
                    sphere1.position.x = -1.5 + Math.sin(Date.now() * 0.001) * 0.2;
                    sphere2.position.x = 1.5 - Math.sin(Date.now() * 0.001) * 0.2;
                } else if (isConnected) {
                    sphere1.position.x = -0.8;
                    sphere2.position.x = 0.8;
                }

                const newPoints = [
                    new THREE.Vector3(sphere1.position.x, 0, 0),
                    new THREE.Vector3(sphere2.position.x, 0, 0)
                ];
                line.geometry.setFromPoints(newPoints);
            }

            renderer.render(scene, camera);
            gl.endFrameEXP();
        };

        animate();
    };

    if (reduceMotion) {
        return (
            <View style={styles.fallbackContainer}>
                <View style={styles.fallbackRow}>
                    <View style={[styles.staticCircle, { backgroundColor: isConnected ? COLORS.success : isConnecting ? COLORS.warning : COLORS.primary }]} />
                    <View style={styles.staticLine} />
                    <View style={[styles.staticCircle, { backgroundColor: COLORS.secondary, opacity: 0.5 }]} />
                </View>
                <Text style={styles.fallbackText}>
                    {isConnected ? 'Connection Established' : isConnecting ? 'Establishing Connection...' : 'Ready to Pair'}
                </Text>
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
    fallbackRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    staticCircle: { width: 40, height: 40, borderRadius: 20 },
    staticLine: { width: 80, height: 2, backgroundColor: COLORS.border, marginHorizontal: 10 },
    fallbackText: { fontSize: 16, color: COLORS.subtext, fontWeight: '500' }
});
