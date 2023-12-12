export const FormatDocument = (text: string): string => {
  let split = text.split('\r')
  let join = split.join("");

  split = join.split('\n');
  join = split.join(" ");

  split = join.split('\t');
  join = split.join(" ");

  split = join.split("\u0000");
  join = split.join("");

  split = join.split(" ");
  join = split.join(" ")

  join = join.replace(/[^ !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿŒœŠšŸŽžƒˆ˜–—‘’‚“”„†‡•…‰‹›€™]/g, "¿");
  join = join.replace(/\s+/g, ' ');

  return join;
};