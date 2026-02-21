const SkillTag = ({ text }: { text: string }) => {
  return (
    <span className="p-1 px-3 font-bold text-xs text-foreground/70 bg-muted/70  w-fit rounded-full">
      {text}
    </span>
  );
};

export default SkillTag;
