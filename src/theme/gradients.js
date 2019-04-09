export default {
  horizontal: (startColor, endColor) => `linear-gradient(to right, ${startColor}, ${endColor})`,
  vertical: (startColor, endColor) => `linear-gradient(to bottom, ${startColor}, ${endColor})`,
};
