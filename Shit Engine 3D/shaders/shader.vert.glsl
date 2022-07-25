attribute vec3 position;

uniform mat4 p_matrix;
uniform mat4 v_matrix;
uniform mat4 m_matrix;

attribute vec3 color;

varying vec3 v_color;

void main(void) {

    gl_Position = p_matrix * v_matrix * m_matrix * vec4(position, 1);

    v_color = color;
}